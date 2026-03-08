import { formatToField } from "../utils/formatter.js"

export function renderSvg(model){

const svg=document.getElementById("wallSvg")
if(!svg) return

svg.innerHTML=""

const {wallLength,ribs,panels}=model

const width=svg.clientWidth||900
const height=300

svg.setAttribute("viewBox",`0 0 ${width} ${height}`)

const scale=wallLength>0?width/wallLength:1

const wallTop=90
const wallHeight=80

const panelDimY=40
const totalDimY=250

/* PANEL SHADING */

panels.forEach((panel,i)=>{

const rect=document.createElementNS("http://www.w3.org/2000/svg","rect")

rect.setAttribute("x",panel.start*scale)
rect.setAttribute("y",wallTop)

rect.setAttribute("width",(panel.end-panel.start)*scale)
rect.setAttribute("height",wallHeight)

rect.setAttribute("class",i%2?"panel-fill-b":"panel-fill-a")

svg.appendChild(rect)

})

/* WALL OUTLINE */

const wall=document.createElementNS("http://www.w3.org/2000/svg","rect")

wall.setAttribute("x",0)
wall.setAttribute("y",wallTop)
wall.setAttribute("width",wallLength*scale)
wall.setAttribute("height",wallHeight)

wall.setAttribute("class","wall-outline")

svg.appendChild(wall)

/* PANEL SEAMS */

panels.forEach(panel=>{

if(panel.start===0) return

const x=panel.start*scale

const seam=document.createElementNS("http://www.w3.org/2000/svg","line")

seam.setAttribute("x1",x)
seam.setAttribute("x2",x)
seam.setAttribute("y1",wallTop)
seam.setAttribute("y2",wallTop+wallHeight)

seam.setAttribute("class","panel-seam")

svg.appendChild(seam)

})

/* RIBS */

ribs.forEach(rib=>{

const x=rib.position*scale

const line=document.createElementNS("http://www.w3.org/2000/svg","line")

line.setAttribute("x1",x)
line.setAttribute("x2",x)
line.setAttribute("y1",wallTop)
line.setAttribute("y2",wallTop+wallHeight)

line.setAttribute("class","rib-line")

svg.appendChild(line)

const label=document.createElementNS("http://www.w3.org/2000/svg","text")

label.setAttribute("x",x)
label.setAttribute("y",wallTop+wallHeight+16)
label.setAttribute("text-anchor","middle")

label.textContent=formatToField(rib.position)

svg.appendChild(label)

})

/* PANEL DIMENSIONS */

panels.forEach(panel=>{

const start=panel.start*scale
const end=panel.end*scale

const line=document.createElementNS("http://www.w3.org/2000/svg","line")

line.setAttribute("x1",start)
line.setAttribute("x2",end)
line.setAttribute("y1",panelDimY)
line.setAttribute("y2",panelDimY)

line.setAttribute("class","dimension-line")

svg.appendChild(line)

const text=document.createElementNS("http://www.w3.org/2000/svg","text")

text.setAttribute("x",(start+end)/2)
text.setAttribute("y",panelDimY-5)
text.setAttribute("text-anchor","middle")

text.setAttribute("class","dimension-text")

text.textContent=formatToField(panel.end-panel.start)

svg.appendChild(text)

})

/* TOTAL WALL DIMENSION */

const totalLine=document.createElementNS("http://www.w3.org/2000/svg","line")

totalLine.setAttribute("x1",0)
totalLine.setAttribute("x2",wallLength*scale)
totalLine.setAttribute("y1",totalDimY)
totalLine.setAttribute("y2",totalDimY)

totalLine.setAttribute("stroke","#4FC3F7")
totalLine.setAttribute("stroke-width","2")

svg.appendChild(totalLine)

const totalText=document.createElementNS("http://www.w3.org/2000/svg","text")

totalText.setAttribute("x",(wallLength*scale)/2)
totalText.setAttribute("y",totalDimY-8)

totalText.setAttribute("text-anchor","middle")
totalText.setAttribute("fill","#4FC3F7")

totalText.textContent=formatToField(wallLength)

svg.appendChild(totalText)

}
