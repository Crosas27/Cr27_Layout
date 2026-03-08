import { formatToField } from "../utils/formatter.js"

export function renderGable(model){

const svg=document.getElementById("wallSvg")
if(!svg) return

svg.innerHTML=""

const width=svg.clientWidth||900
const height=320

svg.setAttribute("viewBox",`0 0 ${width} ${height}`)

const {
wallLength,
eaveHeight,
peakHeight,
gableCuts
}=model

const scaleX=width/wallLength
const scaleY=200/peakHeight

const baseY=260

/* WALL */

const wallHeight=eaveHeight*scaleY

const wall=document.createElementNS("http://www.w3.org/2000/svg","rect")

wall.setAttribute("x",0)
wall.setAttribute("y",baseY-wallHeight)

wall.setAttribute("width",wallLength*scaleX)
wall.setAttribute("height",wallHeight)

wall.setAttribute("class","wall-outline")

svg.appendChild(wall)

/* PANEL CUT LINES */

gableCuts.forEach(panel=>{

const x1=panel.start*scaleX
const x2=panel.end*scaleX

const y1=baseY-(panel.leftHeight*scaleY)
const y2=baseY-(panel.rightHeight*scaleY)

const line=document.createElementNS("http://www.w3.org/2000/svg","line")

line.setAttribute("x1",x1)
line.setAttribute("y1",y1)

line.setAttribute("x2",x2)
line.setAttribute("y2",y2)

line.setAttribute("stroke","#FF7043")
line.setAttribute("stroke-width","2")

svg.appendChild(line)

})

/* ROOF LINES */

const peakX=(wallLength/2)*scaleX
const peakY=baseY-(peakHeight*scaleY)

const leftRoof=document.createElementNS("http://www.w3.org/2000/svg","line")

leftRoof.setAttribute("x1",0)
leftRoof.setAttribute("y1",baseY-wallHeight)

leftRoof.setAttribute("x2",peakX)
leftRoof.setAttribute("y2",peakY)

leftRoof.setAttribute("stroke","#90A4AE")
leftRoof.setAttribute("stroke-width","2")

svg.appendChild(leftRoof)

const rightRoof=document.createElementNS("http://www.w3.org/2000/svg","line")

rightRoof.setAttribute("x1",wallLength*scaleX)
rightRoof.setAttribute("y1",baseY-wallHeight)

rightRoof.setAttribute("x2",peakX)
rightRoof.setAttribute("y2",peakY)

rightRoof.setAttribute("stroke","#90A4AE")
rightRoof.setAttribute("stroke-width","2")

svg.appendChild(rightRoof)

/* PEAK LABEL */

const peakLabel=document.createElementNS("http://www.w3.org/2000/svg","text")

peakLabel.setAttribute("x",peakX)
peakLabel.setAttribute("y",peakY-10)

peakLabel.setAttribute("text-anchor","middle")

peakLabel.textContent=formatToField(peakHeight)

svg.appendChild(peakLabel)

}