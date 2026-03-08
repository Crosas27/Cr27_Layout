import { formatToField } from "../utils/formatter.js"

export function renderGable(model){

const svg = document.getElementById("wallSvg")
if(!svg) return

svg.innerHTML = ""

const width = svg.clientWidth || 900
const height = 320

svg.setAttribute("viewBox", `0 0 ${width} ${height}`)

/* MARGINS */

const marginTop = 40
const marginBottom = 40
const marginSide = 40

/* AVAILABLE DRAW AREA */

const drawWidth = width - (marginSide * 2)
const drawHeight = height - (marginTop + marginBottom)

/* MODEL VALUES */

const {
wallLength,
eaveHeight,
peakHeight
} = model

/* SCALE */

const scaleX = drawWidth / wallLength
const scaleY = drawHeight / peakHeight

/* BASELINE */

const baseY = height - marginBottom

/* WALL HEIGHT */

const wallHeight = eaveHeight * scaleY

/* WALL LEFT */

const wallLeft = marginSide

/* WALL RIGHT */

const wallRight = marginSide + (wallLength * scaleX)

/* DRAW WALL */

const wall = document.createElementNS("http://www.w3.org/2000/svg","rect")

wall.setAttribute("x", wallLeft)
wall.setAttribute("y", baseY - wallHeight)

wall.setAttribute("width", wallLength * scaleX)
wall.setAttribute("height", wallHeight)

wall.setAttribute("class","wall-outline")

svg.appendChild(wall)

/* ROOF PEAK */

const peakX = wallLeft + (wallLength * scaleX) / 2
const peakY = baseY - (peakHeight * scaleY)

/* LEFT ROOF */

const leftRoof = document.createElementNS("http://www.w3.org/2000/svg","line")

leftRoof.setAttribute("x1", wallLeft)
leftRoof.setAttribute("y1", baseY - wallHeight)

leftRoof.setAttribute("x2", peakX)
leftRoof.setAttribute("y2", peakY)

leftRoof.setAttribute("stroke","#90A4AE")
leftRoof.setAttribute("stroke-width","2")

svg.appendChild(leftRoof)

/* RIGHT ROOF */

const rightRoof = document.createElementNS("http://www.w3.org/2000/svg","line")

rightRoof.setAttribute("x1", wallRight)
rightRoof.setAttribute("y1", baseY - wallHeight)

rightRoof.setAttribute("x2", peakX)
rightRoof.setAttribute("y2", peakY)

rightRoof.setAttribute("stroke","#90A4AE")
rightRoof.setAttribute("stroke-width","2")

svg.appendChild(rightRoof)

/* PEAK LABEL */

const peakLabel = document.createElementNS("http://www.w3.org/2000/svg","text")

peakLabel.setAttribute("x", peakX)
peakLabel.setAttribute("y", peakY - 10)

peakLabel.setAttribute("text-anchor","middle")
peakLabel.setAttribute("fill","#e6e6e6")

peakLabel.textContent = formatToField(peakHeight)

svg.appendChild(peakLabel)

}