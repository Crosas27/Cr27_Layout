export function generateLayout(config){

const ribs = calculateRibs(config)
const panels = calculatePanels(config)

const peakHeight = calculatePeakHeight(
config.wallLength,
config.eaveHeight,
config.roofPitch
)

const gableCuts = calculateGableCuts(
config.wallLength,
config.eaveHeight,
config.roofPitch,
config.panelCoverage
)

return {

...config,

peakHeight,

ribs,
panels,
gableCuts

}

}

/* PEAK HEIGHT */

function calculatePeakHeight(width,eaveHeight,pitch){

const halfSpan = width / 2
const rise = (pitch / 12) * halfSpan

return eaveHeight + rise

}

/* RIB LAYOUT */

function calculateRibs({wallLength,ribSpacing,startOffset}){

const ribs=[]

let position=startOffset

while(position<=wallLength){

ribs.push({position})

position+=ribSpacing

}

return ribs

}

/* PANEL POSITIONS */

function calculatePanels({wallLength,panelCoverage}){

const panels=[]

let position=0

while(position<wallLength){

panels.push({

start:position,
end:Math.min(position+panelCoverage,wallLength)

})

position+=panelCoverage

}

return panels

}

/* GABLE PANEL CUTS */

function calculateGableCuts(width,eaveHeight,pitch,panelCoverage){

const cuts=[]

let start=0
let index=1

while(start < width){

const end=Math.min(start+panelCoverage,width)

const leftHeight = getRoofHeight(start,width,eaveHeight,pitch)
const rightHeight = getRoofHeight(end,width,eaveHeight,pitch)

cuts.push({

panel:index,
start,
end,
leftHeight,
rightHeight

})

start+=panelCoverage
index++

}

return cuts

}

/* ROOF HEIGHT */

function getRoofHeight(x,width,eaveHeight,pitch){

const half=width/2
const slope=pitch/12

let rise

if(x<=half){

rise=x*slope

}else{

rise=(width-x)*slope

}

return eaveHeight+rise

}