import dotSVGBackGround from '@/utils/svgUtils/backgrounds/dotSVGBackGround'
import inlineSVGString from '@/utils/svgUtils/inlineSVGString'
import { fabric } from 'fabric'

const dotPattern = () => {
  const pattern = new fabric.Pattern({
    source: inlineSVGString({
      svgString: dotSVGBackGround({})
    }),
    repeat: 'repeat'
  })

  return pattern
}

export default dotPattern
