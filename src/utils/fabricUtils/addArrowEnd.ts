import type { DefaultSquareMode } from "@/stores/types/CanvasStoreTypes";
import calculateArrowAngle from "@/utils/calculateArrowAngle";
import { fabric } from "fabric";

type AddArrowEndArgs = {
  position: number[][];
  canvasObjects: fabric.Object;
  squareSettings: DefaultSquareMode;
};

const addArrowEnd = ({
  position,
  canvasObjects,
  squareSettings,
}: AddArrowEndArgs) => {
  const lastPosition = position[position.length - 2];
  const startPosition = position[Math.floor(position.length * 0.8)]; // get start from last 30% of the stroke

  const angle = calculateArrowAngle(startPosition, lastPosition);

  const lastX = lastPosition[0] ?? 0;
  const lastY = lastPosition[1] ?? 0;

  const triangle = new fabric.Triangle({
    width: 20,
    height: 30,
    top: lastY,
    left: lastX,
    angle: angle,
    originX: "center",
    originY: "center",
    centeredRotation: true,
    fill: squareSettings.stroke,
  });

  const group = new fabric.Group([canvasObjects, triangle], {
    cornerSize: 6,
    evented: true,
    selectable: true,
    hasControls: true,
    objectCaching: false,
    hasRotatingPoint: true,
  });

  return group;
};

export default addArrowEnd;
