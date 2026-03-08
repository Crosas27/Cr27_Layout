import { generateLayout } from "../core/layoutEngine.js"
import { renderSvg } from "../renderer/svgRenderer.js"
import { renderGable } from "../renderer/gableRenderer.js"
import { renderRibTable } from "../renderer/ribTableRenderer.js"

export function initUI(){

const btn=document.getElementById("renderBtn")

if(!btn) return

btn.addEventListener("click",handleRender)

}

function handleRender(){

const wallType=document.getElementById("wallType").value

const config={

wallType,
wallLength:parseFloat(document.getElementById("wallLength").value)||0,
gableHeight:parseFloat(document.getElementById("gableHeight").value)||0,
ribSpacing:parseFloat(document.getElementById("ribSpacing").value)||12,
panelCoverage:parseFloat(document.getElementById("panelCoverage").value)||36,
startOffset:parseFloat(document.getElementById("offset").value)||0

}

const model=generateLayout(config)

if(wallType==="sidewall"){
renderSvg(model)
}

if(wallType==="gable"){
renderGable(model)
}

renderRibTable(model)

}