type DownloadCanvasAsSVGArgs = {
  width: number;
  height: number;
  selectedCanvasName: string;
  canvas: fabric.Canvas | null;
};

const downloadCanvasAsSvg = ({
  canvas,
  width,
  height,
  selectedCanvasName,
}: DownloadCanvasAsSVGArgs) => {
  if (!canvas) {
    return;
  }

  // const meta = storedCanvasMetaData.storedValue[props.selectedCanvasName];

  // const viewBoxWidth = meta.dimensions.width; // Double the width
  // const viewBoxHeight = meta.dimensions.height;

  const svg = canvas.toSVG({
    viewBox: {
      x: 0,
      y: 0,
      width: width,
      height: height,
    },
    width: width,
    height: height,
  });

  const encodedSvg = `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;

  // Create an anchor element to trigger the download
  const a = document.createElement("a");
  a.href = encodedSvg;
  a.download = `${selectedCanvasName}.svg`;

  // Trigger a click event on the anchor element to initiate the download
  a.click();

  // remove the anchor element from the DOM
  a.remove();
};

export default downloadCanvasAsSvg;
