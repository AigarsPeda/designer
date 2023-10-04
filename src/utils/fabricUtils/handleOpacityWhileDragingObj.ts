import { fabric } from "fabric";

let originalOpacity = 1;
let resetOpacityTimer = 0;

const handleOpacityWhileDraggingObj = (object: fabric.Object) => {
  object.set({
    opacity: 0.7,
  });

  // Clear any existing resetOpacityTimer
  clearTimeout(resetOpacityTimer);

  // Set a timer to reset opacity to 1 after a delay (e.g., 1000 milliseconds or 1 second)
  resetOpacityTimer = setTimeout(() => {
    object.set({
      opacity: 1,
    });

    // Make sure to call canvas.renderAll() to update the canvas
    // canvas.renderAll();
  }, 150); // Adjust the delay as needed (in milliseconds)
};

export default handleOpacityWhileDraggingObj;
