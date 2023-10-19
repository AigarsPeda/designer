import type { CustomRectI } from "@/types/fabric.types";

// Initialize patterns so that they are updated when re-rendering
// const pasterns = createAllPatterns();

const scalingObjAndPreservingCorners = (event: fabric.IEvent<MouseEvent>) => {
  const rec = event.transform?.target as CustomRectI;
  if (rec) {
    const scaleX = rec.scaleX || 1;
    const scaleY = rec.scaleY || 1;

    const oldWidth = rec.width || 1;
    const oldHeight = rec.height || 1;

    const newWidth = oldWidth * scaleX;
    const newHeight = oldHeight * scaleY;

    rec.setOptions({
      scaleX: 1,
      scaleY: 1,
      width: newWidth,
      height: newHeight,
      cornerSize: 6,
      noScaleCache: false,
      // fill: findPattern({
      //   pasterns,
      //   stroke: rec.myStroke,
      //   background: rec.myFill,
      //   isFindEnabled: rec.isBackgroundPattern,
      // }),
    });

    rec.setCoords();
  }
};

export default scalingObjAndPreservingCorners;