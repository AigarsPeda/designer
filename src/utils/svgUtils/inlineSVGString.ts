const inlineSVGString = ({ svgString }: { svgString: string }) => {
  return `data:image/svg+xml;utf8,${encodeURIComponent(svgString)}`
}

export default inlineSVGString
