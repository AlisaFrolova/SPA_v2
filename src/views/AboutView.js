import {createEl} from "./tools.js"

const sectionImages = {
    img1: "https://images-assets.nasa.gov/image/iss071e439624/iss071e439624~orig.jpg",
    img2: "https://images-assets.nasa.gov/image/sts098-333-007/sts098-333-007~orig.jpg",
    img3: "https://images-assets.nasa.gov/image/KSC-pa-sts-89/KSC-pa-sts-89~orig.jpg"
}

export default function aboutView(){
    const app = document.querySelector('#app')

    //section
    const section = document.createElement("section")
    app.append(section)

    section.append(createEl("h1", "About us", "header"))

    for(let i = 1; i < 4; i++){
        section.append(createInfoSection("A", "B", sectionImages[`img${i}`]))
    }

    return section
}

function createInfoSection(headerText, mainText, imgURL){
    const infoSection = createEl("section", "", "infoSection")

    infoSection.append(createEl("h2", headerText, "textWhite"))
    infoSection.append(createEl("p", mainText, "textWhite"))
    infoSection.style.backgroundImage = `url(${imgURL})`

    return infoSection
}