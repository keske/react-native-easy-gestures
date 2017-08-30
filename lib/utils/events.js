/*
 * Get current touches
 *
 * @param {Object} initial event
 * @return {Array}
 */
export const getTouches = (event) => event.nativeEvent.touches;

/*
 * Get angle
 *
 * Diff between current angle and initial angle
 *
 * @param {Object} initial event
 * @param {Object} styles
 * @param {Number} diff
 * @return {String} angle
 */
export const getAngle = (event, styles, diffAngle, snapThreshold) => {

  const { transform = [] } = styles;

  const currentAngle = parseFloat(
    transform
      .map((style) => style.rotate)
      .reduce((a, b) => b || a, 0)
    , 0);

  let computedAngle = currentAngle - diffAngle;

  if (computedAngle > 0) {
    computedAngle %= 360;
  } else {
    computedAngle = -(Math.abs(computedAngle) % 360);
  }

  const newAngle = [-360, -270, -180, -90, 0, 90, 180, 270, 360]
    .find(testAngle => testAngle - snapThreshold < computedAngle && testAngle + snapThreshold > computedAngle)
    || computedAngle;

  return `${newAngle}deg`;
};

/*
 * Get scale
 *
 * @param {Object} initial event
 * @param {Object} styles
 * @param {Number} diff
 * @return {Number} scale
 */
export const getScale = (event, styles, diffDistance) => {
  const { transform = [] } = styles;

  const currentScale = transform
    .map((style) => style.scale)
    .reduce((a, b) => b || a, 1);

  const newScale = currentScale - (diffDistance / 400);

  return newScale;
};

/*
 * Is multi touch
 *
 * @param {Object} initial event
 * @return {Boolean}
 */
export const isMultiTouch = (event) => {
  const currentTouches = getTouches(event);

  return currentTouches.length > 1;
};
