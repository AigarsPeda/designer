const handleGetCanvasCenter = (
  canvas: fabric.Canvas | null
): { x: number; y: number } => {
  const canvasCenter = canvas?.getCenter();
  const canvasCenterX = canvasCenter?.left || 0;
  const canvasCenterY = canvasCenter?.top || 0;

  return { x: canvasCenterX, y: canvasCenterY };
};

export default handleGetCanvasCenter;
