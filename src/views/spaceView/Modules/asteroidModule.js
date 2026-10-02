import { getAsteroids } from "../../../NasaApi.js"
import {createEl} from "../../tools.js"
import { getCurrentDay } from "../../tools.js"
import { getPreviousDay } from "../../tools.js"
import { getRandomNumber } from "../../tools.js"


//spawn cards
let asteroidsArr = [] //1 
let tempArr = [] //2
const asteroidContainer = createEl("div", "", "asteroidContainer")
const asteroidImages = {
    img1: "https://images-assets.nasa.gov/image/PIA23876/PIA23876~orig.jpg",
    img2: "https://images-assets.nasa.gov/image/PIA15506/PIA15506~orig.jpg",
    img3: "https://images-assets.nasa.gov/image/PIA02471/PIA02471~orig.jpg"
}

export default function createAsteroidSection(){
    const asteroidSection = createEl("section", "", "asteroidSection")
    asteroidSection.append(createEl("h2", "Asteroids", "header")) 
    asteroidContainer.style.backgroundImage = `url(https://images-assets.nasa.gov/image/iss074e0472536/iss074e0472536~orig.jpg)`
    getAsteroids(getPreviousDay(), getCurrentDay()).then(asteroids => {
        asteroidsArr = structuredClone(asteroids.near_earth_objects)
        for (const key in asteroidsArr) {
            tempArr = tempArr.concat(asteroidsArr[key])
        }
        asteroidSection.firstElementChild.after(createSortMenu())
        
        spawnCards(tempArr)
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

function spawnCards(arr){ 
    for (const el of arr) {
        asteroidContainer.append(createAsteroidCard(el.name,
            el.close_approach_data[0].close_approach_date_full,
                Math.floor(el.estimated_diameter.meters.estimated_diameter_min),
                   Math.floor(el.close_approach_data[0].miss_distance.lunar),
                       el.is_potentially_hazardous_asteroid, asteroidImages[`img${getRandomNumber(1, 4)}`]))
    }
}



//sort and filters


function createSortMenu(){ // 1 2 
    const asteroidSortMenu = createEl("div", "", "asteroidSortMenu")

    asteroidSortMenu.append(createEl("h2", "Filter & Sort Asteroids", "textWhite"))

    const asteroidSortContainer = createEl("div", "", "asteroidSortContainer")
    asteroidSortContainer.append(createSortBlock("range", "Diameter"))
    asteroidSortContainer.append(createSortBlock("range", "LD"))
    asteroidSortContainer.append(createSortBlock("checkbox", "Hazardous"))
    
    asteroidSortContainer.append(createSortContainer("Size"))
    asteroidSortContainer.append(createSortContainer("Distance"))

    asteroidSortMenu.append(asteroidSortContainer)
    
    const confirmButton = createEl("button", "Apply", "confirmButton")
    const hazardousInput = asteroidSortContainer.children[2].firstElementChild
    confirmButton.addEventListener("click", () => {
        if(!hazardousInput.checked){
            tempArr = tempArr.filter(obj => { return !obj.is_potentially_hazardous_asteroid })
        }
        tempArr = filterByRange()
        
        asteroidContainer.innerHTML = ""
        spawnCards(tempArr)

        tempArr = []
        for (const key in asteroidsArr) { //!!!
            tempArr = tempArr.concat(asteroidsArr[key])
        }
    })
    asteroidSortMenu.append(confirmButton)

    return asteroidSortMenu
}  

const filterByRange = () => tempArr.filter(obj => { return obj.estimated_diameter.meters.estimated_diameter_min >= parseInt(document.querySelector("#Diameter").value) &&
        obj.close_approach_data[0].miss_distance.lunar >= parseInt(document.querySelector("#LD").value)}) //2

function findMinAndMax(type){ //2
    const newArr = []
    for (const el of tempArr) {
        let temp
        if(type === "Diameter"){
            temp = Math.floor(el.estimated_diameter.meters.estimated_diameter_min)
        }
        if(type === "LD"){
            temp = Math.floor(el.close_approach_data[0].miss_distance.lunar)
        }
        newArr.push(temp)
    }
    const max = Math.max(...newArr);
    const min = Math.min(...newArr);
    
    return [min, max]
}

function createSortBlock(inputType, inputName){
    const sortBlock = createEl("div", "", "sortBlock")

    const tempInput = createEl("input", "", "asteroidInput")
    tempInput.type = inputType
    tempInput.id = inputName
    tempInput.name = inputName
    sortBlock.append(tempInput)

    const tempLabel = createEl("label", inputName, "asteroidLabel")
    tempLabel.for = inputName
    sortBlock.append(tempLabel)
    
    if(inputType === "range"){
        const minAndMax = findMinAndMax(inputName)
        tempInput.min = minAndMax[0]
        tempInput.max = minAndMax[1]

        const inputValue = createEl("p", tempInput.value, "accent")
        tempInput.addEventListener("input", () => {
            inputValue.textContent = tempInput.value
        })
        sortBlock.prepend(inputValue)
    }

    return sortBlock
}

function createSortContainer(type){ //2
    const sortContainer = createEl("div", "", "sortContainer")

    const sortByIncrease = createSortBlock("radio", `Sort By Increasing ${type}`)
    sortByIncrease.classList.add(type)
    sortByIncrease.firstElementChild.name = "sortOption"
    sortByIncrease.addEventListener("click", () => {
        tempArr = sortByIncreasing(tempArr, type)
    })
    sortContainer.append(sortByIncrease)

    const sortByDecrease = createSortBlock("radio", `Sort By Decreasing ${type}`)
    sortByDecrease.classList.add(type)
    sortByDecrease.firstElementChild.name = "sortOption"
    sortByDecrease.addEventListener("click", () => {
        tempArr = sortByIncreasing(tempArr, type).reverse()
    })
    sortContainer.append(sortByDecrease)

    return sortContainer
}

const sortByIncreasing = (tempArr, type) => { //2
    if(type === "Distance"){
        return tempArr.sort((a, b) => a.close_approach_data[0].miss_distance.lunar - b.close_approach_data[0].miss_distance.lunar)
    }else{
        return tempArr.sort((a, b) => a.estimated_diameter.meters.estimated_diameter_min - b.estimated_diameter.meters.estimated_diameter_min)
    }
}