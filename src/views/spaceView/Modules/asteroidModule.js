import { getAsteroids } from "../../../NasaApi.js"
import {createEl} from "../../tools.js"
import { getCurrentDay } from "../../tools.js"
import { getPreviousDay } from "../../tools.js"



//spawn cards
let asteroidsArr = []
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
    getAsteroids(getPreviousDay(), getCurrentDay()).then(asteroids => { //ADD SOME VALIDATION BEFORE !
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
                Math.round(obj.estimated_diameter.meters.estimated_diameter_min),
                   Math.round(obj.close_approach_data[0].miss_distance.lunar),
                       obj.is_potentially_hazardous_asteroid, asteroidImages[`img${i}`]))
        }
        i++
    }
}



//sort and filters




function createSortMenu(arr){
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
        filterByRange("Diameter")
        filterByRange("LD")

        bubbleSort()//NF. doesnt work properly because of asteroidsArr structure

        asteroidContainer.innerHTML = ""
        spawnCards()
    })
    asteroidSortMenu.append(confirmButton)

    return asteroidSortMenu
}  

function filterByRange(type){
    for (const key in asteroidsArr) {     
        asteroidsArr[key] = asteroidsArr[key].filter(obj => {
            if(type === "Diameter"){
                return parseInt(obj.estimated_diameter.meters.estimated_diameter_min) >= parseInt(document.querySelector("#Diameter").value)
            }
            if(type === "LD"){
                return parseInt(obj.close_approach_data[0].miss_distance.lunar) >= parseInt(document.querySelector("#LD").value)
            }
        })
    }
}

function findMinAndMax(type){
    const new_arr = []
    for (const key in asteroidsArr) {        
        const obj = asteroidsArr[key];
        for (const el of obj) {
            let temp
            if(type === "Diameter"){
                temp = parseInt(el.estimated_diameter.meters.estimated_diameter_min)
            }
            if(type === "LD"){
                temp = parseInt(el.close_approach_data[0].miss_distance.lunar)
            }
            new_arr.push(temp)
        }
    }
    const max = Math.max(...new_arr);
    const min = Math.min(...new_arr);
    
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

function createSortContainer(type){
    const sortContainer = createEl("div", "", "sortContainer")

    const sortByIncrease = createSortBlock("radio", `Sort By Increasing ${type}`)
    sortByIncrease.classList.add(type)
    sortByIncrease.firstElementChild.name = "sortOption"
    sortByIncrease.addEventListener("click", () => {
        bubbleSort()
    })
    sortContainer.append(sortByIncrease)

    const sortByDecrease = createSortBlock("radio", `Sort By Decreasing ${type}`)
    sortByDecrease.classList.add(type)
    sortByDecrease.firstElementChild.name = "sortOption"
    sortByDecrease.addEventListener("click", () => {
        //.reverse()
    })
    sortContainer.append(sortByDecrease)

    return sortContainer
}

function bubbleSort(){ //NF
    let swapped
    for (const key in asteroidsArr) {
        swapped = false
        const arr = asteroidsArr[key]
        for(let i = 0; i < arr.length-1; i++){
            for (let j = 0; j < arr.length - i - 1; j++) {
                if (arr[j].estimated_diameter.meters.estimated_diameter_min > arr[j+1].estimated_diameter.meters.estimated_diameter_min) {
                    [arr[j], arr[j+1]] = [arr[j+1], arr[j]]
                    swapped = true
                }
            }
        if (!swapped)
            break
        }
        asteroidsArr[key] = arr
    }
}