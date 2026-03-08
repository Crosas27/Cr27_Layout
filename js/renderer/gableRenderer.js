import { formatToField } from "../utils/formatter.js"

export function renderGable(model){

const svg = document.getElementById("wallSvg")
if(!svg) return

svg.innerHTML = ""

const width = svg.clientWidth || 900
const height = 340

svg.setAttribute("viewBox", `0 0 ${width} ${height}`)

const margin = 40

const drawWidth = width - margin*2
const drawHeight = height - margin*2

const {
wallLength,
eaveHeight,
peakHeight,
panels,
ribs,
gableCuts
} = model

const scaleX = drawWidth / wallLength
const scaleY = drawHeight / peakHeight

const baseY = height - margin

/* --------------------------- */
/* WALL BASE LINE              */
/* --------------------------- */

const wallTop = baseY - (eaveHeight * scaleY)

const wall = document.createElementNS("http://www.w3.org/2000/svg","line")

wall.setAttribute("x1", margin)
wall.setAttribute("x2", margin + wallLength*scaleX)
wall.setAttribute("y1", wallTop)
wall.setAttribute("y2", wallTop)

wall.setAttribute("class","wall-outline")

svg.appendChild(wall)


/* --------------------------- */
/* ROOF LINES                  */
/* --------------------------- */

const peakX = margin + (wallLength*scaleX)/2
const peakY = baseY - (peakHeight*scaleY)

const leftRoof = document.createElementNS("http://www.w3.org/2000/svg","line")

leftRoof.setAttribute("x1",margin)
leftRoof.setAttribute("y1",wallTop)
leftRoof.setAttribute("x2",peakX)
leftRoof.setAttribute("y2",peakY)

leftRoof.setAttribute("class","roof-line")

svg.appendChild(leftRoof)

const rightRoof = document.createElementNS("http://www.w3.org/2000/svg","line")

rightRoof.setAttribute("x1",margin + wallLength*scaleX)
rightRoof.setAttribute("y1",wallTop)
rightRoof.setAttribute("x2",peakX)
rightRoof.setAttribute("y2",peakY)

rightRoof.setAttribute("class","roof-line")

svg.appendChild(rightRoof)


/* --------------------------- */
/* PANEL SEGMENTATION          */
/* --------------------------- */

panels.forEach((panel,i)=>{

const x = margin + panel.start*scaleX

const line = document.createElementNS("http://www.w3.org/2000/svg","line")

line.setAttribute("x1",x)
line.setAttribute("x2",x)
line.setAttribute("y1",wallTop)
line.setAttribute("y2",baseY)

line.setAttribute("class","panel-seam")

svg.appendChild(line)

})


/* --------------------------- */
/* RIB ALIGNMENT               */
/* --------------------------- */

ribs.forEach(rib=>{

const x = margin + rib.position*scaleX

const line = document.createElementNS("http://www.w3.org/2000/svg","line")

line.setAttribute("x1",x)
line.setAttribute("x2",x)
line.setAttribute("y1",wallTop)
line.setAttribute("y2",baseY)

line.setAttribute("class","rib-line")

svg.appendChild(line)

})


/* --------------------------- */
/* GABLE CUT VISUALIZATION     */
/* --------------------------- */

gableCuts.forEach(cut=>{

const startX = margin + cut.start*scaleX
const endX = margin + cut.end*scaleX

const leftY = baseY - (cut.leftHeight*scaleY)
const rightY = baseY - (cut.rightHeight*scaleY)

const poly = document.createElementNS("http://www.w3.org/2000/svg","polygon")

poly.setAttribute(
"points",
`${startX},${baseY} ${startX},${leftY} ${endX},${rightY} ${endX},${baseY}`
)

poly.setAttribute("fill","rgba(120,150,180,0.15)")

svg.appendChild(poly)

})


/* --------------------------- */
/* CUT MEASUREMENTS            */
/* --------------------------- */

gableCuts.forEach(cut=>{

const midX = margin + ((cut.start + cut.end)/2)*scaleX

const text = document.createElementNS("http://www.w3.org/2000/svg","text")

text.setAttribute("x",midX)
text.setAttribute("y",baseY+18)

text.setAttribute("text-anchor","middle")
text.setAttribute("class","dimension-text")

text.textContent =
`${formatToField(cut.leftHeight)} → ${formatToField(cut.rightHeight)}`

svg.appendChild(text)

})

}
