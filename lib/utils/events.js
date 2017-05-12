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
export const getAngle = (event, styles, diffAngle) => {
  let currentAngle = 1;

  styles.transform.filter((transformStyles) => {
    Object.keys(transformStyles).map((style) => {
      if (style === 'rotate') {
        currentAngle = +transformStyles.rotate.replace('deg', '');
      }
    });
  });

  return `${currentAngle - diffAngle}deg`;
};

/*
 * Get scale
 *
 * @param {Object} initial event
 * @param {Object} state
 * @param {Boolean} is should scale
 * @return {Number} scale
 */
export const getScale = (event, styles, diffDistance) => {
  let currentScale = 1;

  styles.transform.filter((transformStyles) => {
    Object.keys(transformStyles).map((style) => {
      if (style === 'scale') {
        currentScale = transformStyles.scale;
      }
    });
  });

  const newScale = currentScale - (diffDistance / 400);

  return newScale > 0.3 ? newScale : 0.3;
};

export const isMultiTouch = (event) => {
  const currentTouches = getTouches(event);

  return currentTouches.length > 1;
};
