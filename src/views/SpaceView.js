import createEl from "./tools.js"
import getAPOD from "../NasaApi.js"
import {getAsteroids} from "../NasaApi.js"

export default function spaceView(){
    const app = document.querySelector('#app')

    //section
    const section = createEl("section", "", "spaceSection")
    app.append(section)

    section.append(createEl("h1", "Space", "header"))

    const APODSection = createEl("section", "", "APODSection")

    getAPOD("").then(picture => {
        APODSection.style.backgroundImage = `url(${picture.url})`
    })

    section.append(APODSection)

    APODSection.append(createEl("p", "Astronomy Picture of the Day", "textWhite"))
    
    let arr = []
    getAsteroids().then(asteroids => { //ADD SOME VALIDATION BEFORE !
        arr = asteroids.near_earth_objects["2026-09-09"] //WORKS!!!!!!!!!!!!!!!
        console.log(arr)
    })

    return section
}

//     // const searchBox = document.createElement("div")
//     // section.append(searchBox)

//     // const searchInput = document.createElement("input")
//     // searchInput.type = "text"
//     // searchInput.id = "searchInput"
//     // searchBox.append(searchInput)

//     // const labelSearch = document.createElement("label")
//     // labelSearch.for = "searchInput"
//     // labelSearch.textContent = "Search"
//     // searchBox.append(labelSearch)
