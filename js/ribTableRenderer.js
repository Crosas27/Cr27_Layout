import { formatToField } from "../utils/formatter.js"

export function renderRibTable(model){

const container=document.getElementById("ribTable")
if(!container) return

let html=""

html+=`<strong>Total Panels:</strong> ${model.panels.length}<br>`
html+=`<strong>Wall Length:</strong> ${formatToField(model.wallLength)}<br><br>`

html+="<strong>Rib Layout</strong><br>"

model.ribs.forEach((rib,i)=>{

html+=`• Rib ${i+1} — ${formatToField(rib.position)} (${rib.position}")<br>`

})

container.innerHTML=html

}