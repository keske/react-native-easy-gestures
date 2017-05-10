import React, { Component, PropTypes } from 'react';
import { PanResponder, View } from 'react-native';

// Utils
import { angle, distance } from './utils/math.js';
import { getAngle, getScale, getTouches, isMultiTouch } from './utils/events.js';

export default class Gestures extends Component {

  static defaultProps = {
    children: {},
    draggable: true,
    rotatable: true,
    scalable: true,
    onStart: () => {},
    onChange: () => {},
    onRelease: () => {},
    styles: {
      left: 0,
      top: 0,
      transform: [
        { rotate: '0deg' },
        { scale: 1 },
      ],
    },
  }

  static propTypes = {
    children: PropTypes.object,
    // Options
    draggable: PropTypes.bool,
    rotatable: PropTypes.bool,
    scalable: PropTypes.bool,
    // Styles
    styles: PropTypes.object,
    // Callbacks
    onStart: PropTypes.func,
    onChange: PropTypes.func,
    onRelease: PropTypes.func,
  };

  state = {
    initialTouches: {},
    initialStyles: {},
    layout: {},
    styles: this.props.styles,
  }

  componentWillMount() {
    this.pan = PanResponder.create({
      onPanResponderGrant: this.onMoveStart,
      onPanResponderMove: this.onMove,
      onPanResponderRelease: this.onMoveEnd,

      onPanResponderTerminate: () => true,
      onShouldBlockNativeResponder: () => true,
      onStartShouldSetPanResponder: () => true,
      onPanResponderTerminationRequest: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
    });
  }

  onMoveStart = (event) => {
    const { styles } = this.state;
    const { onStart } = this.props;

    this.prevAngle = 0;
    this.prevDistance = 0;
    this.initialTouchesAngle = 0;

    this.setState({
      initialTouches: getTouches(event),
      initialStyles: styles,
    });

    // Callback
    if (onStart) {
      onStart(event);
    }
  }

  onMove = (event, gestureState) => {
    const { onChange } = this.props;

    this.onDrag(event, gestureState);
    this.onPinch(event);

    // Callback
    if (onChange) {
      onChange(this.state.styles, event);
    }
  }

  onMoveEnd = (event) => {
    const { onRelease } = this.props;

    // Callback
    if (onRelease) {
      onRelease(event);
    }
  }

  onDrag = (event, gestureState) => {
    const { initialStyles } = this.state;
    const { draggable } = this.props;

    if (draggable) {
      this.updateStyles({
        left: initialStyles.left + gestureState.dx,
        top: initialStyles.top + gestureState.dy,
      });
    }
  }

  onPinch = (event) => {
    const { initialTouches } = this.state;
    const { rotatable, scalable } = this.props;

    if (isMultiTouch(event)) {
      const currentDistance = distance(getTouches(event));
      const initialDistance = distance(initialTouches);
      const increasedDistance = currentDistance - initialDistance;
      const diffDistance = this.prevDistance - increasedDistance;

      const currentAngle = angle(getTouches(event));
      const initialAngle = angle(initialTouches) || this.initialTouchesAngle || currentAngle;
      const newAngle = currentAngle - initialAngle;
      const diffAngle = this.prevAngle - newAngle;

      this.prevAngle = newAngle;
      this.prevDistance = increasedDistance;

      this.updateStyles({
        transform: [
          {
            scale: scalable
              ? getScale(event, this.state, diffDistance)
              : 1,
          },
          {
            rotate: rotatable
              ? getAngle(event, this.state, diffAngle)
              : '0deg',
          },
        ],
      });

      if (initialAngle === currentAngle) {
        this.initialTouchesAngle = currentAngle;
      }
    }
  }

  updateStyles = (newStyles) => {
    this.setState({
      styles: {
        ...this.state.styles,
        ...newStyles,
      },
    });
  }

  render() {
    const { styles } = this.state;

    return (
      <View
        style={styles}
        onLayout={(event) => {
          this.setState({
            layout: event.nativeEvent.layout,
          });
        }}
        {
          ...this.pan.panHandlers
        }
      >
        {
          this.props.children
        }
      </View>
    );
  }
}
