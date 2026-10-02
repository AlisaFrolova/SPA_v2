import {createEl} from "./tools.js"
import { getAPOD } from "../NasaApi.js"

export default function newsView(){
    const app = document.querySelector('#app')

    //section
    const section = createEl("section", "", "newsSection")
    app.append(section)

    section.append(createEl("h1", "News", "header"))

    const cardsContainer = createEl("section", "", "newsPreviewCardsContainer")

    let arr = []
    getAPOD("").then(data => {
        arr = structuredClone(data)
        console.log(arr)
        
        spawnNewsCards(arr, cardsContainer)
    }) 

    section.append(spawnSortMenu())
    section.append(cardsContainer)

    return section
}

function createNewsCard(imgURL, title, description){
    const container = createEl("div", "", "newsPreviewCard")

    const textBlock = createEl("div", "", "previewNewsText")
    textBlock.append(createEl("h2", title, "text"))
    textBlock.append(createEl("p", description, "text"))
    container.append(textBlock)
    
    const img = createEl("img", "", "newsPreviewImg")
    img.src = imgURL
    container.prepend(img)

    return container
}
function getDescription(el){
    const tempBlock = createEl("div", "", "block")
    tempBlock.innerHTML = el.explanation
    return tempBlock.textContent
}
function spawnNewsCards(arr, container){
    for (const el of arr) {
        container.append(createNewsCard(el.hdurl, el.title, getDescription(el)))
    }
}
function spawnSortMenu(){
    const sortMenu = createEl("section", "", "newsSortMenu")

    sortMenu.append(createEl("h2", "Sort by Date", "text"))

    const inputContainer = createEl("div", "", "inputDateContainer")

    const tempLabel = createEl("label", "Date: ", "asteroidLabel")
    tempLabel.for = "dateInput"
    inputContainer.append(tempLabel)

    const tempInput = createEl("input", "", "dateInput")
    tempInput.type = "date"
    tempInput.id = "dateInput"
    tempInput.name = "date"
    tempInput.addEventListener("input", () => {
        console.log(tempInput.value)//+, but may return 000X as a year and etc
    })
    inputContainer.append(tempInput)

    sortMenu.append(inputContainer)

    return sortMenu
}

// date: "2026-09-30"
// explanation: "<strong>Explanation:</strong> <a href=\"http://ned.ipac.caltech.edu/level5/Arp/frames.html\">Peculiar</a> spiral galaxy Arp 78 is found within the boundaries of the head strong <a href=\"http://hawastsoc.org/deepsky/ari/index.html\">constellation Aries</a>. Some 100 million light-years beyond the stars and nebulae of our Milky Way galaxy, the island universe is an enormous 200,000 light-years across. <a href=\"https://www.nasa.gov/image-feature/goddard/2019/hubble-spots-a-curious-spiral\">Also known as NGC 772</a>, it sports a prominent, outer spiral arm in <a href=\"https://app.astrobin.com/u/Robsi?i=nfm6vp\">this detailed cosmic portrait</a>. Tracking along sweeping dust lanes and <a href=\"http://arxiv.org/abs/0810.1748\">lined with</a> young blue star clusters, Arp 78's overdeveloped spiral arm is <a href=\"https://noirlab.edu/public/images/noirlab2209a/\">pumped-up</a> by galactic-scale gravitational tides. Interactions with its brightest companion galaxy, the more compact NGC 770 seen directly below the larger spiral, are likely responsible. Embedded in faint star streams revealed in the deep telescopic exposure, NGC 770's fuzzy, elliptical appearance contrasts nicely with spiky foreground Milky Way stars.<br><br><strong>APOD's email for image submissions has changed.</strong> Please see: <a href=\"https://apod.nasa.gov/apod/lib/apsubmit2015.html\">APOD Submissions</a>.<br><strong>Tomorrow's picture: </strong>a harvest"
// hdurl: "https://assets.science.nasa.gov/dynamicimage/assets/science/cds/apod/apod/2026/october/NGC772_Robert_Eder.jpg?w=1772&h=1182&fit=clip&crop=faces%2Cfocalpoint"
// post_id: 1424625
// title: "Arp 78: Peculiar Galaxy in Aries"
// url: "https://science.nasa.gov/image-article/apod-2026-september-30-arp-78-peculiar-galaxy-in-aries/"


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