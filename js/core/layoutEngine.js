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

/* RIBS */

function calculateRibs({wallLength,ribSpacing,startOffset}){

const ribs=[]

let position=startOffset

while(position<=wallLength){

ribs.push({position})

position+=ribSpacing

}

return ribs

}

/* PANELS */

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

/* GABLE CUTS */

function calculateGableCuts(width,eaveHeight,pitch,panelCoverage){

const panels=[]

const half=width/2

let position=0
let index=1

while(position<width){

const center=position+(panelCoverage/2)

const height=getRoofHeight(center,width,eaveHeight,pitch)

panels.push({

panel:index,
center,
cutHeight:height

})

position+=panelCoverage
index++

}

return panels

}

/* ROOF HEIGHT AT ANY POINT */

function getRoofHeight(x,width,eaveHeight,pitch){

const half=width/2

const risePerInch=pitch/12

const distanceFromEdge =
x <= half ? x : width - x

const rise = distanceFromEdge * risePerInch

return eaveHeight + rise

}
