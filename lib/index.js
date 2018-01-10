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
    minScale: 0.33,
    maxScale: 2,
    snapThreshold: 0,
    panResponderThreshold: Platform.OS === 'windows' ? 10 : 0,
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
    // Min, Max scale
    minScale: PropTypes.number,
    maxScale: PropTypes.number,
    // Min, Max scale
    scale: PropTypes.number,
    rotate: PropTypes.string,
    snapThreshold: PropTypes.number,
    panResponderThreshold: PropTypes.number,
    // Styles
    styles: PropTypes.object,
    // Callbacks
    onStart: PropTypes.func,
    onChange: PropTypes.func,
    onRelease: PropTypes.func,
    pointerEvents: PropTypes.string,
  };

  constructor(props) {
    super(props);
    let styles = Gestures.defaultProps.styles;
    if (props && props.styles ) {
      styles = {
        ...styles,
        ...props.styles
      };
    }

    styles = {
      ...styles,
      transform: styles.transform.map(t=>
        t.scale && props.scale ? {scale: props.scale} :
          t.rotate && props.rotate ? {rotate: props.rotate} :
            t),
      top: props.rotate === '180deg' && styles.height ? styles.height : styles.top,
      left: props.rotate === '90deg' && styles.width ? styles.width : styles.left,
    }

    this.state = { styles };
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
      onMoveShouldSetPanResponder: (event, gestureState) =>
        gestureState.dx > this.props.panResponderThreshold && gestureState.dy > this.props.panResponderThreshold,
      onMoveShouldSetPanResponderCapture: (event, gestureState) =>
        gestureState.dx > this.props.panResponderThreshold &&  gestureState.dy > this.props.panResponderThreshold,
    });
  }

  componentWillReceiveProps(nextProps) {
    this.updateProps(nextProps);
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

    if (draggable) {
      this.dragStyles = {
        left: initialStyles.left + gestureState.dx,
        top: initialStyles.top + gestureState.dy,
      };
    }
  }

  onPinch = (event) => {
    const { rotatable, scalable, minScale, maxScale, snapThreshold } = this.props;
    const { styles } = this.state;
    const { initialTouches } = this;

    if (isMultiTouch(event)) {
      const currentDistance = distance(getTouches(event));
      const initialDistance = distance(initialTouches);
      const increasedDistance = currentDistance - initialDistance;
      const diffDistance = this.prevDistance - increasedDistance;

      const currentAngle = angle(getTouches(event));
      const initialAngle = initialTouches.length > 1
        ? angle(initialTouches)
        : currentAngle;
      const newAngle = currentAngle - initialAngle;
      const diffAngle = this.prevAngle - newAngle;

      this.pinchStyles = { transform: [] };

      if (scalable) {
        this.pinchStyles.transform.push({
          scale: Math.min(Math.max(
            getScale(event, styles, diffDistance),
            minScale), maxScale),
        });
      }

      if (rotatable) {
        this.pinchStyles.transform.push({
          rotate: getAngle(event, styles, diffAngle, snapThreshold),
        });
      }

      this.prevAngle = newAngle;
      this.prevDistance = increasedDistance;
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

  updateProps = nextProps => {
    if ( nextProps.rotate !== this.props.rotate &&
      nextProps.rotate !== this.state.styles.transform.find(t=>t.rotate).rotate ) {
      this.setState( prevState => ({
        styles: {
          ...prevState.styles,
          transform: prevState.styles.transform.map(t=>t.rotate ? {rotate: nextProps.rotate} : t)
        }
      }));
    }

    if ( nextProps.scale !== this.props.scale &&
      nextProps.scale !== this.state.styles.transform.find(t=>t.scale).scale ) {
      this.setState(prevState => ({
        styles: {
          ...prevState.styles,
          transform: prevState.styles.transform.map(t=>t.scale ? {scale: nextProps.scale} : t)
        }
      }));
    }
  };

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