import { formatToField } from "../utils/formatter.js"

export function renderGable(model){

const svg = document.getElementById("wallSvg")
if(!svg) return

svg.innerHTML = ""

const width = svg.clientWidth || 900
const height = 320

svg.setAttribute("viewBox", `0 0 ${width} ${height}`)

/* MODEL */

const { wallLength, eaveHeight, peakHeight, gableCuts } = model

/* MARGINS */

const margin = 40
const drawWidth = width - margin * 2
const drawHeight = height - margin * 2

/* SCALE */

const scaleX = drawWidth / wallLength
const scaleY = drawHeight / peakHeight

/* BASELINE */

const baseY = height - margin

/* WALL LEFT */

const wallLeft = margin

/* PEAK */

const peakX = wallLeft + (wallLength * scaleX) / 2
const peakY = baseY - (peakHeight * scaleY)

/* DRAW ROOF */

const leftRoof = document.createElementNS("http://www.w3.org/2000/svg","line")

leftRoof.setAttribute("x1", wallLeft)
leftRoof.setAttribute("y1", baseY - (eaveHeight * scaleY))
leftRoof.setAttribute("x2", peakX)
leftRoof.setAttribute("y2", peakY)

leftRoof.setAttribute("class","wall-outline")

svg.appendChild(leftRoof)

const rightRoof = document.createElementNS("http://www.w3.org/2000/svg","line")

rightRoof.setAttribute("x1", wallLeft + wallLength * scaleX)
rightRoof.setAttribute("y1", baseY - (eaveHeight * scaleY))
rightRoof.setAttribute("x2", peakX)
rightRoof.setAttribute("y2", peakY)

rightRoof.setAttribute("class","wall-outline")

svg.appendChild(rightRoof)

/* DRAW PANELS */

gableCuts.forEach(panel => {

const startX = wallLeft + panel.start * scaleX
const endX = wallLeft + panel.end * scaleX

const leftY = baseY - (panel.leftHeight * scaleY)
const rightY = baseY - (panel.rightHeight * scaleY)

/* PANEL CUT LINE */

const cut = document.createElementNS("http://www.w3.org/2000/svg","line")

cut.setAttribute("x1", startX)
cut.setAttribute("y1", leftY)

cut.setAttribute("x2", endX)
cut.setAttribute("y2", rightY)

cut.setAttribute("stroke","#4FC3F7")
cut.setAttribute("stroke-width","2")

svg.appendChild(cut)

/* PANEL SIDES */

const leftEdge = document.createElementNS("http://www.w3.org/2000/svg","line")

leftEdge.setAttribute("x1", startX)
leftEdge.setAttribute("x2", startX)

leftEdge.setAttribute("y1", baseY)
leftEdge.setAttribute("y2", leftY)

leftEdge.setAttribute("class","rib-line")

svg.appendChild(leftEdge)

const rightEdge = document.createElementNS("http://www.w3.org/2000/svg","line")

rightEdge.setAttribute("x1", endX)
rightEdge.setAttribute("x2", endX)

rightEdge.setAttribute("y1", baseY)
rightEdge.setAttribute("y2", rightY)

rightEdge.setAttribute("class","rib-line")

svg.appendChild(rightEdge)

/* LABEL */

const label = document.createElementNS("http://www.w3.org/2000/svg","text")

label.setAttribute("x", (startX + endX) / 2)
label.setAttribute("y", Math.min(leftY,rightY) - 8)

label.setAttribute("text-anchor","middle")
label.setAttribute("fill","#e6e6e6")
label.setAttribute("font-size","10")

label.textContent =
`${formatToField(panel.leftHeight)} → ${formatToField(panel.rightHeight)}`

svg.appendChild(label)

})

}
