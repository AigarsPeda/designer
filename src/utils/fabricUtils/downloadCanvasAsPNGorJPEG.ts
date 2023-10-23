type DownloadCanvasAsPNGorJPEGArgs = {
  width: number;
  height: number;
  selectedCanvasName: string;
  canvas: fabric.Canvas | null;
  fileExtension: "png" | "jpeg";
};

const downloadCanvasAsPNGorJPEG = ({
  canvas,
  width,
  height,
  fileExtension,
  selectedCanvasName,
}: DownloadCanvasAsPNGorJPEGArgs) => {
  if (!canvas) {
    return;
  }

  canvas.setZoom(1);

  const dataURL = canvas.toDataURL({
    quality: 1,
    width: width,
    height: height,
    format: fileExtension,
  });

  // Create an anchor element to trigger the download
  const a = document.createElement("a");
  a.href = dataURL;
  a.download = `${selectedCanvasName}.${fileExtension}`;

  // Trigger a click event on the anchor element to initiate the download
  a.click();

  // remove the anchor element from the DOM
  a.remove();
};

export default downloadCanvasAsPNGorJPEG;
