import R from 'ramda';

// Utils
import { distance } from '../utils/math.js';
import { getScale, getTouches } from '../utils/events.js';

export function onScale(event) {
  const { scalable } = this.props;
  const { styles } = this.state;
  const { initialTouches } = this;

  const isObject = R.is(Object, scalable);

  if (isObject || scalable) {
    const currentDistance = distance(getTouches(event));
    const initialDistance = distance(initialTouches);
    const increasedDistance = currentDistance - initialDistance;
    const diffDistance = this.prevDistance - increasedDistance;

    const min = isObject ? scalable.min : 0.33;
    const max = isObject ? scalable.max : 2;
    const scale = Math.min(Math.max(getScale(event, styles, diffDistance), min), max);

    this.pinchStyles.transform.push({ scale });
    this.prevDistance = increasedDistance;
  }
}
