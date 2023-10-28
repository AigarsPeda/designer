const cubicEasing = (t: number) =>
  Math.max(0, Math.min(1, t)) * t * t * (3 - 2 * t);

export default cubicEasing;
