import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { PanResponder, View } from 'react-native';

import R from 'ramda';

// Utils
import { angle, distance } from './utils/math.js';
import { getAngle, getScale, getTouches, isMultiTouch } from './utils/events.js';

export default class Gestures extends Component {
  static defaultProps = {
    children: {},

    draggable: true || {
      x: true,
      y: false,
    },

    rotatable: true,

    scalable: true || {
      min: 0.33,
      max: 2,
    },

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

    draggable: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.object,
    ]),

    rotatable: PropTypes.bool,

    scalable: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.object,
    ]),

    // Styles
    styles: PropTypes.object,

    // Callbacks
    onStart: PropTypes.func,
    onChange: PropTypes.func,
    onRelease: PropTypes.func,

    pointerEvents: PropTypes.string,
  };

  state = {
    styles: {
      ...Gestures.defaultProps.styles,
      ...this.props.styles,
    },
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
      onMoveShouldSetPanResponderCapture: (event, gestureState) =>
        gestureState.dx !== 0 && gestureState.dy !== 0,
    });
  }

  onMoveStart = (event) => {
    const { styles } = this.state;
    const { onStart } = this.props;

    this.prevAngle = 0;
    this.prevDistance = 0;
    this.initialTouchesAngle = 0;
    this.pinchStyles = {};
    this.dragStyles = {};

    this.initialTouches = getTouches(event);
    this.initialStyles = styles;

    // Callback
    if (onStart) {
      onStart(event, styles);
    }
  }

  onMove = (event, gestureState) => {
    const { styles } = this.state;
    const { onChange } = this.props;

    const { initialTouches } = this;

    const newTouches = getTouches(event);
    if (newTouches.length !== initialTouches.length) {
      this.initialTouches = newTouches;
    } else {
      this.onDrag(event, gestureState);
      this.onPinch(event);
    }

    this.updateStyles();

    // Callback
    if (onChange) {
      onChange(event, styles);
    }
  }

  onMoveEnd = (event) => {
    const { onRelease } = this.props;
    const { styles } = this.state;

    // Callback
    if (onRelease) {
      onRelease(event, styles);
    }
  }

  onDrag = (event, gestureState) => {
    const { initialStyles } = this;
    const { draggable } = this.props;

    const isObject = R.is(Object, draggable);

    const left = (isObject ? draggable.x : draggable)
      ? initialStyles.left + gestureState.dx
      : initialStyles.left;

    const top = (isObject ? draggable.y : draggable)
      ? initialStyles.top + gestureState.dy
      : initialStyles.top;

    this.dragStyles = { left, top };
  }

  onScale = (event, initialTouches) => {
    const { scalable } = this.props;
    const { styles } = this.state;

    const currentDistance = distance(getTouches(event));
    const initialDistance = distance(initialTouches);
    const increasedDistance = currentDistance - initialDistance;
    const diffDistance = this.prevDistance - increasedDistance;

    const isObject = R.is(Object, scalable);

    if (isObject || scalable) {
      const min = isObject ? scalable.min : 0.33;
      const max = isObject ? scalable.max : 2;
      const scale = Math.min(Math.max(getScale(event, styles, diffDistance), min), max);

      this.pinchStyles.transform.push({ scale });
    }

    this.prevDistance = increasedDistance;
  }

  onPinch = (event) => {
    const { rotatable } = this.props;
    const { styles } = this.state;
    const { initialTouches } = this;

    if (isMultiTouch(event)) {
      const currentAngle = angle(getTouches(event));
      const initialAngle = initialTouches.length > 1
        ? angle(initialTouches)
        : currentAngle;
      const newAngle = currentAngle - initialAngle;
      const diffAngle = this.prevAngle - newAngle;

      this.pinchStyles = { transform: [] };

      this.onScale(event, initialTouches);

      if (rotatable) {
        this.pinchStyles.transform.push({
          rotate: getAngle(event, styles, diffAngle),
        });
      }

      this.prevAngle = newAngle;
    }
  }

  updateStyles = () => {
    const styles = {
      ...this.state.styles,
      ...this.dragStyles,
      ...this.pinchStyles,
    };
    this.updateNativeStyles(styles);
    this.setState({ styles });
  }

  updateNativeStyles = (styles) => {
    if (this.view) {
      this.view.setNativeProps({ styles });
    }
  }

  render() {
    const { styles } = this.state;
    const { pointerEvents } = this.props;

    return (
      <View
        ref={(view) => { this.view = view; }}
        style={styles}
        {
          ...this.pan.panHandlers
        }
        pointerEvents={pointerEvents}
      >
        {
          this.props.children
        }
      </View>
    );
  }
}
