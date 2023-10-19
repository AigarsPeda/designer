interface Dimensions {
  width: number;
  height: number;
}

const calculateScale = (first: Dimensions, second: Dimensions): number => {
  const widthRatio = Math.min(
    first.width / second.width,
    second.width / first.width
  );
  const heightRatio = Math.min(
    first.height / second.height,
    second.height / first.height
  );

  return Math.min(widthRatio, heightRatio);
};

export default calculateScale;
