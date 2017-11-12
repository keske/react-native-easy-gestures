// Utils
import { angle } from '../utils/math.js';
import { getAngle, getTouches } from '../utils/events.js';

export function onRotate(event) {
  const { rotatable } = this.props;
  const { styles } = this.state;
  const { initialTouches } = this;

  if (rotatable) {
    const currentAngle = angle(getTouches(event));
    const initialAngle = initialTouches.length > 1
      ? angle(initialTouches)
      : currentAngle;
    const newAngle = currentAngle - initialAngle;
    const diffAngle = this.prevAngle - newAngle;

    this.pinchStyles.transform.push({
      rotate: getAngle(event, styles, diffAngle),
    });

    this.prevAngle = newAngle;
  }
}
