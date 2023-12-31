type DotSVGBackGroundArgs = {
  size?: number;
  fill?: string;
  radius?: number;
  circleColor?: string;
  circlePositions?: number[][];
};

const cSize = 30;
const cRadius = 1;

const cPositions = [
  [cSize, 0],
  [0, 0],
  [cSize, cSize],
  [0, cSize],
];

const dotSVGBackGround = ({
  size = cSize,
  radius = cRadius,
  fill = "transparent",
  circleColor = "#64748b",
  circlePositions = cPositions,
}: DotSVGBackGroundArgs) => {
  const cStyle = `fill:${circleColor};stroke:${circleColor};stroke-width:0.6;`;

  return `
  <svg width="${size / 2}" height="${size / 2}" viewBox="0 0 ${size / 2} ${
    size / 2
  }" version="1.1" xmlns="http://www.w3.org/2000/svg"><defs/><g>
  <rect width="100%" height="100%" fill="${fill}" />
    ${circlePositions
      .map(
        ([cx, cy]) =>
          `<circle style="${cStyle}" cx="${cx}" cy="${cy}" r="${radius}"/>`
      )
      .join("\n")}
    </g></svg>`;
};

export default dotSVGBackGround;
