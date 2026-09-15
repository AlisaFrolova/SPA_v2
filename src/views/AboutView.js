import createEl from "./tools.js"

export default function aboutView(){
    const app = document.querySelector('#app')

    //section
    const section = document.createElement("section")
    app.append(section)

    section.append(createEl("h1", "About us", "header"))

    // const searchBox = document.createElement("div")
    // section.append(searchBox)

    // const searchInput = document.createElement("input")
    // searchInput.type = "text"
    // searchInput.id = "searchInput"
    // searchBox.append(searchInput)

    // const labelSearch = document.createElement("label")
    // labelSearch.for = "searchInput"
    // labelSearch.textContent = "Search"
    // searchBox.append(labelSearch)

    return section
}

