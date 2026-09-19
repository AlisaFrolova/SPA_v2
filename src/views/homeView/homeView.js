import createEl from "../tools.js"
import createAchievementsSection from "./Modules/achievementsModule.js"

export default function homeView(){
    const app = document.querySelector('#app')

    //section
    const section = document.createElement("section")
    app.append(section)

    section.append(createEl("h1", "Astra Spectrum Analytics", "header"))

    section.append(createAchievementsSection())

    return section
}
