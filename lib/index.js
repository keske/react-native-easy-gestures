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
    const { onStart } = this.props;

    this.setState({
      initialTouches: getTouches(event),
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
    const { draggable } = this.props;

    if (draggable) {
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
    const { styles } = this.state;
    const { rotatable, scalable } = this.props;

    let currentScale = 0;
    const newScale = getScale(event, this.state, scalable);

    styles.transform.filter((style) => {
      Object.keys(style).map((s) => {
        if (s === 'scale') {
          currentScale = style.scale;
        }
      });
    });

    const increasedScale = newScale - currentScale;

    console.log(increasedScale);

    if (isMultiTouch(event)) {
      this.updateStyles({
        transform: [
          { scale: newScale },
          // { rotate: getAngle(event, this.state, rotatable) },
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
