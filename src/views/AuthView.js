import {createEl} from "./tools.js"

const credentials = { username: 'johnd', password: 'm38rmF$' };

export default function signIn(){ //NF
    if(localStorage.getItem("token") === null){
        return spawnForm()
    }
}
function spawnForm(){
    //form
    const form = document.createElement("div")

    //login
    const loginContainer = document.createElement("div")
    form.append(loginContainer)

    const loginInput = document.createElement("input")
    loginInput.type = "text"
    loginInput.name = "login"
    loginInput.placeholder = "login"
    loginInput.id = "loginId"
    loginContainer.append(loginInput)

    const labelLogin = createEl("label", "Login", "textWhite")
    labelLogin.for = "loginId"
    loginContainer.append(labelLogin)

    //password
    const passwordContainer = document.createElement("div")
    form.append(passwordContainer)

    const passwordInput = document.createElement("input")
    passwordInput.type = "text"
    passwordInput.name = "password"
    passwordInput.placeholder = "password"
    passwordInput.id = "passwordId"
    passwordContainer.append(passwordInput)

    const labelPassword = createEl("label", "Password", "textWhite")
    labelPassword.for = "passwordId"
    passwordContainer.append(labelPassword)

    //button
    const submitButton = createEl("button", "Submit", "submitButton")
    form.append(submitButton)

    submitButton.addEventListener('click', () => {
        
        if(loginInput.value === credentials.username && passwordInput.value === credentials.password){
            fetch('https://fakestoreapi.com/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials)
            }).then(response => response.json()).then(data => localStorage.setItem("token", data.token)).then(() => {window.location.replace("/SPA_v2/")})
        }
        event.preventDefault()
        console.log(loginInput.value)
        console.log(passwordInput.value)
    })

    return form
}
