import HomeView from "./views/HomeView.js"
import SpaceView from "./views/SpaceView.js"
import NewsView from "./views/NewsView.js"
import AboutView from "./views/AboutView.js"
import AuthView from "./views/AuthView.js";

const routes = {
    "/": HomeView,
    "/space": SpaceView,
    "/news": NewsView,
    "/about": AboutView,
    "/auth": AuthView
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


