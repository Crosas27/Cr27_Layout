import { formatToField } from "../utils/formatter.js"

import {
setupSvg,
getDrawArea,
calculateScale,
drawGrid,
drawLine,
drawText
} from "../utils/svgUtils.js"

export function renderGable(model){

const svg=document.getElementById("wallSvg")
if(!svg) return

const width=svg.clientWidth||900
const height=360

setupSvg(svg,width,height)

drawGrid(svg,width,height)

const {margin,drawWidth,drawHeight}=getDrawArea(width,height)

const {wallLength,eaveHeight,peakHeight,gableCuts}=model

const scale=calculateScale(drawWidth,drawHeight,wallLength,peakHeight)

const baseY=height-margin
const wallLeft=margin

const peakX=wallLeft + (wallLength*scale)/2
const peakY=baseY - peakHeight*scale

const leftTopY=baseY - eaveHeight*scale
const rightTopY=leftTopY

/* ROOF */

drawLine(svg,wallLeft,leftTopY,peakX,peakY,"roof-line")

drawLine(svg,wallLeft+wallLength*scale,rightTopY,peakX,peakY,"roof-line")

/* PANELS */

gableCuts.forEach(panel=>{

const x=wallLeft + panel.start*scale

const roofHeight = getRoofHeight(panel.start)

const y = baseY - roofHeight * scale

drawLine(svg,x,baseY,x,y,"panel-line")

})

/* PANEL CUT LABELS */

gableCuts.forEach(panel=>{

const startX=wallLeft + panel.start*scale
const endX=wallLeft + panel.end*scale

const midX=(startX+endX)/2

drawText(
svg,
midX,
const roofHeight = Math.max(panel.leftHeight, panel.rightHeight)
const labelY = baseY - roofHeight * scale - 16,
  
`${formatToField(panel.leftHeight)} → ${formatToField(panel.rightHeight)}`
)

})

/* PEAK LABEL */

drawText(svg,peakX,peakY-12,formatToField(peakHeight))

}
