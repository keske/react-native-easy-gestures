import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { PanResponder, View } from 'react-native';

import binds from './bind/';
import { getTouches, isMultiTouch } from './utils/events.js';

export default class Gestures extends Component {
  static defaultProps = {
    children: {},
    // Behavior
    draggable: true || {
      x: true,
      y: false,
    },
    rotatable: true,
    scalable: true || {
      min: 0.33,
      max: 2,
    },
    // Styles
    styles: {
      left: 0,
      top: 0,
      transform: [
        { rotate: '0deg' },
        { scale: 1 },
      ],
    },
    // Callbacks
    onStart: () => {},
    onChange: () => {},
    onRelease: () => {},
  }

  static propTypes = {
    children: PropTypes.element,
    // Behavior
    draggable: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.shape({
        x: PropTypes.bool,
        y: PropTypes.bool,
      }),
    ]),
    rotatable: PropTypes.bool,
    scalable: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.shape({
        min: PropTypes.number,
        max: PropTypes.number,
      }),
    ]),
    // Styles
    styles: PropTypes.object,
    // Callbacks
    onStart: PropTypes.func,
    onChange: PropTypes.func,
    onRelease: PropTypes.func,
  };

  constructor(props) {
    super(props);

    binds.map((helper) => {
      Object.keys(helper).map((key) => {
        this[key] = helper[key].bind(this);
      });
    });

    this.state = {
      styles: {
        ...Gestures.defaultProps.styles,
        ...this.props.styles,
      },
    };
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
      onMoveShouldSetPanResponderCapture: (event, { dx, dy }) =>
        dx !== 0 && dy !== 0,
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

    onStart(event, styles);
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

    onChange(event, styles);
  }

  onMoveEnd = (event) => {
    const { onRelease } = this.props;
    const { styles } = this.state;

    onRelease(event, styles);
  }

  onPinch = (event) => {
    if (isMultiTouch(event)) {
      this.pinchStyles = { transform: [] };

      this.onScale(event);
      this.onRotate(event);
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
    this.view.setNativeProps({ styles });
  }

  render() {
    const { styles } = this.state;

    return (
      <View
        ref={(c) => { this.view = c; }}
        style={styles}
        {...this.pan.panHandlers}
      >
        {this.props.children}
      </View>
    );
  }
}
