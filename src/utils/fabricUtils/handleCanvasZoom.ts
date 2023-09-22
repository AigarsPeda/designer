import { fabric } from "fabric";

type HandleCanvasZoomArgs = {
  canvas: fabric.Canvas;
};

const handleCanvasZoom = ({ canvas }: HandleCanvasZoomArgs) => {
  canvas.on("mouse:wheel", (event) => {
    const delta = event.e.deltaY;
    let zoom = canvas.getZoom();

    zoom *= 0.999 ** delta;

    if (zoom > 20) zoom = 20;
    if (zoom < 0.01) zoom = 0.01;

    canvas.zoomToPoint({ x: event.e.offsetX, y: event.e.offsetY }, zoom);

    event.e.preventDefault();
    event.e.stopPropagation();
  });
};

export default handleCanvasZoom;
