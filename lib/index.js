import React, { Component, PropTypes } from 'react';
import { PanResponder, View } from 'react-native';

// Utils
import { getAngle, getScale, getTouches, isMultiTouch } from './utils/events.js';

export default class Gestures extends Component {

  static defaultProps = {
    dragable: true,
    rotateable: true,
    scaleable: true,
  }

  static propTypes = {
    children: PropTypes.object,
    // Options
    dragable: PropTypes.bool,
    rotateable: PropTypes.bool,
    scaleable: PropTypes.bool,
    // Styles
    styles: PropTypes.object,
    // Callbacks
    onChange: PropTypes.func,
    onRelease: PropTypes.func,
    onStart: PropTypes.func,
  };

  state = {
    initialTouches: {},
    layout: {},
    styles: this.props.styles,
    oldStyles: {},
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
      oldStyles: styles,
    });

    // Callback
    if (onStart) {
      onStart();
    }
  }

  onMove = (event, gestureState) => {
    const { styles } = this.props;
    const { onChange } = this.props;

    this.onDrag(event, gestureState);
    this.onPinch(event);

    // Callback
    if (onChange) {
      onChange(styles);
    }
  }

  onMoveEnd = (event, gestureState) => {
    const { onRelease } = this.props;

    this.x += gestureState.dx;
    this.y += gestureState.dy;

    // Callback
    if (onRelease) {
      onRelease();
    }
  }

  onDrag = (event, gestureState) => {
    const { dragable } = this.props;

    if (dragable) {
      const left = this.x === undefined
        ? this.x = 0
        : this.x + gestureState.dx;

      const top = this.y === undefined
        ? this.y = 0
        : this.y + gestureState.dy;

      this.updateStyles({ left, top });
    }
  }

  onPinch = (event) => {
    const { rotateable, scaleable } = this.props;

    if (isMultiTouch(event)) {
      this.updateStyles({
        transform: [
          { scale: getScale(event, this.state, scaleable) },
          { rotate: getAngle(event, this.state, rotateable) },
        ],
      });
    }
  }

  // TODO: remmove x and y vars
  x: 0; y: 0

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
