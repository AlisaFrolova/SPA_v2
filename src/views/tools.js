export default function createEl(tag, text, className){
    const el = document.createElement(tag)
    el.classList.add(className)
    el.textContent = text
    return el
}