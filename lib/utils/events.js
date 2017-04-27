// Math
import { angle, distance } from './math.js';

export const getTouches = (event) => event.nativeEvent.touches;

/*
 * Get angle
 *
 * Diff between current angle and initial angle
 *
 * @param {Object} initial event
 * @param {Object} state
 * @param {Boolean} is should rotate
 * @return {String} angle
 */
export const getAngle = (event, { initialTouches, styles }, rotate) => {
  const newAngle = rotate
    ? angle(getTouches(event)) - angle(initialTouches)
    // TODO: get style
    : styles.transform.rotate;

  return `${newAngle}deg`;
};

/*
 * Get scale
 *
 * @param {Object} initial event
 * @param {Object} state
 * @param {Boolean} is should scale
 * @return {Number} scale
 */
export const getScale = (event, { initialTouches, layout, styles }, scale) => {
  const currentDistance = distance(getTouches(event));
  const initialDistance = distance(initialTouches);
  const increasedDistance = currentDistance - initialDistance;

  const startHeight = layout.height;
  const newHeight = startHeight + increasedDistance;

  return newHeight / startHeight;

  // return scale
    // ? newHeight / startHeight
    // TODO: get style
    // : styles.transform.scale;
};

export const isMultiTouch = (event) => {
  const currentTouches = getTouches(event);

  return currentTouches.length > 1;
};
