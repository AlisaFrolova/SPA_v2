export function createEl(tag, text, className){
    const el = document.createElement(tag)
    el.classList.add(className)
    el.textContent = text
    return el
}

export function getCurrentDay(){ //returns YYYY-MM-DD format
    let date = Date() //Wed Sep 23 2026 22:09:10 GMT+0300 (Moscow Standard Time)
    date = new Date(date)

    let year = date.toString().slice(11, 15) //2026
    let month = (date.getMonth()+1).toString()//9
    let day = date.toString().slice(8, 11)//23
    
    let newDay = `${year}-0${month}-${day}`

    return newDay
}