import { formatToField } from "../utils/formatter.js"

export function renderGable(model){

const svg = document.getElementById("wallSvg")
if(!svg) return

svg.innerHTML=""

const width = svg.clientWidth || 900
const height = 320

svg.setAttribute("viewBox",`0 0 ${width} ${height}`)

const {
wallLength,
eaveHeight,
peakHeight,
ribs
} = model

const scaleX = width / wallLength
const scaleY = 200 / peakHeight

const baseY = 260

/* WALL */

const wallHeight = eaveHeight * scaleY

const wall = document.createElementNS("http://www.w3.org/2000/svg","rect")

wall.setAttribute("x",0)
wall.setAttribute("y",baseY - wallHeight)

wall.setAttribute("width", wallLength * scaleX)
wall.setAttribute("height", wallHeight)

wall.setAttribute("class","wall-outline")

svg.appendChild(wall)

/* RIBS */

ribs.forEach(rib=>{

const x = rib.position * scaleX

const line = document.createElementNS("http://www.w3.org/2000/svg","line")

line.setAttribute("x1",x)
line.setAttribute("x2",x)

line.setAttribute("y1",baseY)
line.setAttribute("y2",baseY - wallHeight)

line.setAttribute("class","rib-line")

svg.appendChild(line)

})

/* ROOF LINES */

const peakX = (wallLength/2) * scaleX
const peakY = baseY - (peakHeight * scaleY)

const leftRoof = document.createElementNS("http://www.w3.org/2000/svg","line")

leftRoof.setAttribute("x1",0)
leftRoof.setAttribute("y1",baseY - wallHeight)

leftRoof.setAttribute("x2",peakX)
leftRoof.setAttribute("y2",peakY)

leftRoof.setAttribute("stroke","#90A4AE")
leftRoof.setAttribute("stroke-width","2")

svg.appendChild(leftRoof)

const rightRoof = document.createElementNS("http://www.w3.org/2000/svg","line")

rightRoof.setAttribute("x1",wallLength * scaleX)
rightRoof.setAttribute("y1",baseY - wallHeight)

rightRoof.setAttribute("x2",peakX)
rightRoof.setAttribute("y2",peakY)

rightRoof.setAttribute("stroke","#90A4AE")
rightRoof.setAttribute("stroke-width","2")

svg.appendChild(rightRoof)

/* PEAK LABEL */

const peakText = document.createElementNS("http://www.w3.org/2000/svg","text")

peakText.setAttribute("x",peakX)
peakText.setAttribute("y",peakY - 10)

peakText.setAttribute("text-anchor","middle")

peakText.textContent = formatToField(peakHeight)

svg.appendChild(peakText)

}
