// From https://github.com/kiddkai/react-native-gestures.git

export const pow2abs = (a, b) => (
  Math.pow(Math.abs(a - b), 2)
);

export const distance = (touches) => {
  const a = touches[0];
  const b = touches[1];

  if (touches.length === 1) {
    return false;
  }

  return Math.sqrt(
    pow2abs(a.pageX, b.pageX) +
    pow2abs(a.pageY, b.pageY),
  2);
};

export const toDeg = (rad) => (
  (rad * 180) / Math.PI
);

export const angle = (touches) => {
  const a = touches[0];
  const b = touches[1];

  if (touches.length < 2) {
    return 0;
  }

  let deg = toDeg(
    Math.atan2(
      b.pageY - a.pageY,
      b.pageX - a.pageX,
    ),
  );

  if (deg < 0) {
    deg += 360;
  }

  return deg;
};
