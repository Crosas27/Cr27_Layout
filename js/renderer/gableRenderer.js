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

const svg = document.getElementById("wallSvg")
if(!svg) return

const width = svg.clientWidth || 900
const height = 360

setupSvg(svg,width,height)

drawGrid(svg,width,height)

const {margin,drawWidth,drawHeight} = getDrawArea(width,height)

const {wallLength,eaveHeight,peakHeight,gableCuts} = model

if(!wallLength || !peakHeight) return

/* SCALE */

const scale = calculateScale(drawWidth,drawHeight,wallLength,peakHeight)

/* BASELINE */

const baseY = height - margin
const wallLeft = margin
const wallRight = wallLeft + wallLength * scale

/* ROOF POINTS */

const peakX = wallLeft + (wallLength * scale) / 2
const peakY = baseY - peakHeight * scale

const leftTopY = baseY - eaveHeight * scale
const rightTopY = leftTopY

/* --------------------- */
/* WALL OUTLINE */
/* --------------------- */

drawLine(svg,wallLeft,baseY,wallLeft,leftTopY,"wall-line")

drawLine(svg,wallRight,baseY,wallRight,rightTopY,"wall-line")

drawLine(svg,wallLeft,baseY,wallRight,baseY,"wall-line")

/* --------------------- */
/* ROOF LINES */
/* --------------------- */

drawLine(svg,wallLeft,leftTopY,peakX,peakY,"roof-line")

drawLine(svg,wallRight,rightTopY,peakX,peakY,"roof-line")

/* --------------------- */
/* PANEL SEAMS */
/* --------------------- */

gableCuts.forEach(panel=>{

const x = wallLeft + panel.start * scale

const roofHeight = Math.max(panel.leftHeight,panel.rightHeight)

const y = baseY - roofHeight * scale

drawLine(svg,x,baseY,x,y,"panel-line")

})

/* --------------------- */
/* PANEL CUT LABELS */
/* --------------------- */

gableCuts.forEach(panel=>{

const startX = wallLeft + panel.start * scale
const endX = wallLeft + panel.end * scale

const midX = (startX + endX) / 2

const roofHeight = Math.max(panel.leftHeight,panel.rightHeight)

const labelY = baseY - roofHeight * scale - 14

drawText(
svg,
midX,
labelY,
`${formatToField(panel.leftHeight)} → ${formatToField(panel.rightHeight)}`
)

})

/* --------------------- */
/* PEAK LABEL */
/* --------------------- */

drawText(
svg,
peakX,
peakY - 12,
formatToField(peakHeight)
)

}
