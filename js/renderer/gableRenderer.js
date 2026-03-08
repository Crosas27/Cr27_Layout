export function renderGable(model){

const svg=document.getElementById("wallSvg")
if(!svg) return

svg.innerHTML=""

const width=svg.clientWidth||900
const height=300

svg.setAttribute("viewBox",`0 0 ${width} ${height}`)

const {wallLength,gableHeight,ribs}=model

const scale=width/wallLength

const baseY=240
const peakX=(wallLength/2)*scale
const peakY=baseY-gableHeight

/* GABLE SHAPE */

const gable=document.createElementNS("http://www.w3.org/2000/svg","polygon")

gable.setAttribute(
"points",
`0,${baseY} ${peakX},${peakY} ${wallLength*scale},${baseY}`
)

gable.setAttribute("fill","none")
gable.setAttribute("stroke","#90A4AE")
gable.setAttribute("stroke-width","2")

svg.appendChild(gable)

/* RIBS */

ribs.forEach(rib=>{

const x=rib.position*scale

const slopeHeight=getRoofHeight(rib.position,wallLength,gableHeight)

const yTop=baseY-slopeHeight

const line=document.createElementNS("http://www.w3.org/2000/svg","line")

line.setAttribute("x1",x)
line.setAttribute("x2",x)

line.setAttribute("y1",baseY)
line.setAttribute("y2",yTop)

line.setAttribute("stroke","#4FC3F7")
line.setAttribute("stroke-width","2")

svg.appendChild(line)

})

}

function getRoofHeight(x,width,height){

const half=width/2

if(x<=half){
return (x/half)*height
}else{
return ((width-x)/half)*height
}

}
