type TileSvgStringArgs = {
  r: number
  size: number
  circleStyle: string
  circlePositions: number[][]
}

const tileSvgString = ({ r, size, circleStyle, circlePositions }: TileSvgStringArgs) => {
  return `<svg width="${size / 2}" height="${size / 2}" viewBox="0 0 ${size / 2} ${
    size / 2
  }" version="1.1" xmlns="http://www.w3.org/2000/svg"><defs/><g>
    ${circlePositions
      .map(([cx, cy]) => `<circle style="${circleStyle}" cx="${cx}" cy="${cy}" r="${r}"/>`)
      .join('\n')}
</g></svg>`
}

export default tileSvgString
