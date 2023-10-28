const PATH_COMMAND_MOVE = "M";
const PATH_COMMAND_CLOSE = "Z";
const PATH_COMMAND_QUADRATIC_BEZIER = "Q";

const getSvgPathFromStroke = (stroke: number[][]) => {
  if (!Array.isArray(stroke) || stroke.length < 1) {
    return "";
  }

  const pathData = [];
  pathData.push(PATH_COMMAND_MOVE, ...stroke[0]);

  for (let i = 0; i < stroke.length; i++) {
    const [x0, y0] = stroke[i];
    const [x1, y1] = i === stroke.length - 1 ? stroke[0] : stroke[i + 1];
    const controlX = (x0 + x1) / 2;
    const controlY = (y0 + y1) / 2;

    pathData.push(PATH_COMMAND_QUADRATIC_BEZIER, controlX, controlY, x1, y1);
  }

  pathData.push(PATH_COMMAND_CLOSE);
  return pathData.join(" ");
};

export default getSvgPathFromStroke;
