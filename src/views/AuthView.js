import createEl from "./tools.js"

export default function AuthView(){
    const app = document.querySelector('#app')
    
    //section
    const section = document.createElement("section")
    app.append(section)
    
    section.append(createEl("h1", "Authenthication", "header"))

    //form
    const form = document.createElement("div")
    section.append(form)

    //login
    const loginContainer = document.createElement("div")
    form.append(loginContainer)

    const loginInput = document.createElement("input")
    loginInput.type = "text"
    loginInput.name = "login"
    loginInput.placeholder = "login"
    loginInput.id = "loginId"
    loginContainer.append(loginInput)

    const labelLogin = document.createElement("label")
    labelLogin.for = "loginId"
    labelLogin.textContent = "Login"
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

    const labelPassword = document.createElement("label")
    labelPassword.for = "passwordId"
    labelPassword.textContent = "password"
    passwordContainer.append(labelPassword)

    //button
    const submitButton = document.createElement("button")
    submitButton.classList.add("submitButton")
    submitButton.textContent = "Submit"
    form.append(submitButton)

    submitButton.addEventListener('click', () => {
        if(loginInput.value === "1" && passwordInput.value === '2'){
            window.location.replace("/SPA_test_v1.0/");
        }

        event.preventDefault()
        console.log(loginInput.value)
        console.log(passwordInput.value)
    })

    return section
}







// const credentials = { username: 'john_doe', password: 'pass123' };
    
   
      
    //     /*  fetch('https://fakestoreapi.com/auth/login', {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify(credentials)
    //       }).then(response => response.json()).then(data => console.log(data)) */

    //   }
