const scalingObjAndPreservingCorners = (event: fabric.IEvent<MouseEvent>) => {
  const rec = event.transform?.target;
  if (rec) {
    const scaleX = rec.scaleX || 1;
    const scaleY = rec.scaleY || 1;

    const oldWidth = rec.width || 1;
    const oldHeight = rec.height || 1;

    const newWidth = oldWidth * scaleX;
    const newHeight = oldHeight * scaleY;

    rec.set({
      width: newWidth,
      height: newHeight,
      scaleX: 1,
      scaleY: 1,
    });

    rec.setCoords();
  }
};

export default scalingObjAndPreservingCorners;
