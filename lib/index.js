import React, { Component, PropTypes } from 'react';
import { PanResponder, View } from 'react-native';

// Utils
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

    this.setState({
      initialTouches: getTouches(event),
      initialStyles: styles,
    });

    // Callback
    if (onStart) {
      onStart();
    }
  }

  onMove = (event, gestureState) => {
    const { onChange } = this.props;

    this.onDrag(event, gestureState);
    this.onPinch(event);

    // Callback
    if (onChange) {
      onChange(this.state.styles);
    }
  }

  onMoveEnd = () => {
    const { onRelease } = this.props;

    // Callback
    if (onRelease) {
      onRelease();
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
    const { initialStyles } = this.state;
    const { rotatable, scalable } = this.props;

    const scale = getScale(event, this.state, scalable);

    // console.log(scale);

    if (isMultiTouch(event)) {
      this.updateStyles({
        transform: [
          { scale },
          // { rotate: getAngle(event, this.state, rotatable) },
        ],
      });
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
