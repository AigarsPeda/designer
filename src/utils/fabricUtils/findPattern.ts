import { fabric } from "fabric";

type FindPatternArgs = {
  stroke: string;
  background: string;
  pasterns: Record<string, fabric.Pattern>;
};

const findPattern = ({ stroke, background, pasterns }: FindPatternArgs) => {
  const key = `${stroke}-${background}`;

  return pasterns[key];
};

export default findPattern;
