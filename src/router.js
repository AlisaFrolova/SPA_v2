import homeView from "./views/homeView/homeView.js"
import spaceView from "./views/spaceView/spaceView.js"
import newsView from "./views/newsView.js"
import aboutView from "./views/aboutView.js"
import authView from "./views/authView.js"
import createAsteroidSection from "./views/spaceView/Modules/asteroidModule.js"

const routes = {
    "/": homeView,
    "/space": spaceView,
    "/news": newsView,
    "/about": aboutView,
    "/auth": authView,
    "/space/asteroids": createAsteroidSection
};

const appContainer = document.getElementById("app")

export const initRouter = () => {
    const router = async () => {
        const path = window.location.pathname
        
        const viewPage = routes[path] || routes["/"]

        appContainer.innerHTML = ''
        appContainer.append(viewPage())
    }
    document.body.addEventListener("click", e =>{
        if(e.target.matches("[data-link]")){
            e.preventDefault(); //so the page won't reload
            window.history.pushState(null, null, e.target.href); //changes URL of page 
            router(); //looks at new path and calls func router()
        }
        });

    document.addEventListener("DOMContentLoaded", router)
}


