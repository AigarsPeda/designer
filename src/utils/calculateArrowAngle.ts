const calculateArrowAngle = (
  startPosition: number[],
  endPosition: number[]
) => {
  const [startX, startY] = startPosition;
  const [endX, endY] = endPosition;
  return (Math.atan2(endY - startY, endX - startX) * 180) / Math.PI + 90;
};

export default calculateArrowAngle;
