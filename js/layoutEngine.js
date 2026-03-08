export function generateLayout(config){

const ribs=calculateRibs(config)
const panels=calculatePanels(config)

return{
...config,
ribs,
panels,
}

}

function calculateRibs({wallLength,ribSpacing,startOffset}){

const ribs=[]
let position=startOffset

while(position<=wallLength){

ribs.push({position})

position+=ribSpacing

}

return ribs

}

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