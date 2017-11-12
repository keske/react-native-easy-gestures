import R from 'ramda';

export function onDrag(event, gestureState) {
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
