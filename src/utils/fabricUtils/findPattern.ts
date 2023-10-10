import { fabric } from "fabric";

type FindPatternArgs = {
  stroke: string;
  background: string;
  isFindEnabled: boolean;
  pasterns: Record<string, fabric.Pattern>;
};

const findPattern = ({
  stroke,
  pasterns,
  background,
  isFindEnabled,
}: FindPatternArgs) => {
  if (!isFindEnabled) {
    return background;
  }

  const key = `${stroke}-${background}`;

  return pasterns[key];
};

export default findPattern;
