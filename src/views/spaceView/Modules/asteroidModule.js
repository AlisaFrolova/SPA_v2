import { getAsteroids } from "../../../NasaApi.js"
import createEl from "../../tools.js"

let asteroidsArr = []
const asteroidSection = createEl("section", "", "asteroidSection")
const asteroidContainer = createEl("div", "", "asteroidContainer")
const asteroidImages = {
    img1: "https://images-assets.nasa.gov/image/PIA23876/PIA23876~orig.jpg",
    img2: "https://images-assets.nasa.gov/image/PIA15506/PIA15506~orig.jpg",
    img3: "https://images-assets.nasa.gov/image/PIA02471/PIA02471~orig.jpg"
}

export default function createAsteroidSection(){
    asteroidSection.append(createEl("h2", "Asteroids", "header")) //add this cool img to background: images-assets.nasa.gov/image/GSFC_20171208_Archive_e000720/GSFC_20171208_Archive_e000720~orig.jpg
    asteroidContainer.style.backgroundImage = `url(https://images-assets.nasa.gov/image/iss074e0472536/iss074e0472536~orig.jpg)`
    getAsteroids().then(asteroids => { //ADD SOME VALIDATION BEFORE !
        asteroidsArr = structuredClone(asteroids.near_earth_objects)
        asteroidSection.firstElementChild.after(createSortMenu(asteroids))
    
        spawnCards()
    })
    asteroidSection.append(asteroidContainer)

    return asteroidSection
}

function createAsteroidCard(asteroidName, approachDate, diameter, lunarDistance, hazardous, imageSource){
    const card = createEl("div", "", "asteroidCard")

    const img = createEl("img", "", "asteroidImage")
    img.src = imageSource
    card.append(img)

    card.append(createEl("p", asteroidName, "accent"))

    card.append(createEl("p", `Date: ${approachDate}`, "textWhite"))

    card.append(createEl("p", `Diameter: ${diameter} m`, "textWhite"))

    card.append(createEl("p", `Lunar Distance: ${lunarDistance} LD`, "textWhite"))

    const asteroidStatus = document.createElement("p")
    if(hazardous){
        asteroidStatus.textContent = "Hazardous Asteroid"
        asteroidStatus.classList.add("hazardousAsteroid")
    } else{
        asteroidStatus.textContent = "Safe Asteroid"
        asteroidStatus.classList.add("safeAsteroid")
    }
    card.append(asteroidStatus)
    return card
}

function spawnCards(){
    let i = 1
    for (const key in asteroidsArr){
        const el = asteroidsArr[key]
        for (const obj of el) {
            asteroidContainer.append(createAsteroidCard(obj.name,
            obj.close_approach_data[0].close_approach_date_full,
                obj.estimated_diameter.meters.estimated_diameter_min,
                   obj.close_approach_data[0].miss_distance.lunar,
                       obj.is_potentially_hazardous_asteroid, asteroidImages[`img${i}`]))
        }
        i++
    }
}

function createSortMenu(arr){
    const asteroidSortMenu = createEl("div", "", "asteroidSortMenu")

    asteroidSortMenu.append(createEl("h2", "Filter Asteroids", "textWhite"))

    const asteroidSortContainer = createEl("div", "", "asteroidSortContainer")
    asteroidSortContainer.append(createSortBlock("range", "Diameter"))
    asteroidSortContainer.append(createSortBlock("range", "Lunar Distance"))
    asteroidSortContainer.append(createSortBlock("checkbox", "Hazardous"))
    asteroidSortMenu.append(asteroidSortContainer)
    
    const confirmButton = createEl("button", "Apply", "confirmButton")
    const hazardousInput = asteroidSortContainer.children[2].firstElementChild
    confirmButton.addEventListener("click", () => {
        if(!hazardousInput.checked){
            const tempArr = structuredClone(arr.near_earth_objects)
            for (const key in tempArr){
                tempArr[key] = tempArr[key].filter(obj => {
                    return !obj.is_potentially_hazardous_asteroid
                })
            }
            asteroidsArr = structuredClone(tempArr)
        }else{
            asteroidsArr = structuredClone(arr.near_earth_objects)
        }
        asteroidContainer.innerHTML = ""
        spawnCards()

// function sortByPrice(arr){
//     arr = arr.filter(el => parseInt(el.prices.slice(0, -1)) >= parseInt(price_input.value))
//     return arr;
// }
    })
    asteroidSortMenu.append(confirmButton)

    return asteroidSortMenu
}    

function createSortBlock(inputType, inputName){
    const sortBlock = createEl("div", "", "sortBlock")

    const tempInput = createEl("input", "", "asteroidInput")
    tempInput.type = inputType
    tempInput.id = inputName
    sortBlock.append(tempInput)

    const tempLabel = createEl("label", inputName, "asteroidLabel")
    tempLabel.for = inputName
    sortBlock.append(tempLabel)

    return sortBlock
}