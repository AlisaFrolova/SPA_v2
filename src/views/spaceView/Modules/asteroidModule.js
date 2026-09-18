import { getAsteroids } from "../../../NasaApi.js"
import createEl from "../../tools.js"

export default function createAsteroidSection(){
    const asteroidContainer = createEl("div", "", "asteroidContainer")
    getAsteroids().then(asteroids => { //ADD SOME VALIDATION BEFORE !
        spawnCards(asteroidContainer, asteroids.near_earth_objects["2026-09-09"])
        spawnCards(asteroidContainer, asteroids.near_earth_objects["2026-09-10"])
        spawnCards(asteroidContainer, asteroids.near_earth_objects["2026-09-11"])
    })
    return asteroidContainer
}

function createAsteroidCard(asteroidName, approachDate, diameter, lunarDistance, hazardous){
        const card = createEl("div", "", "asteroidCard")

        const img = createEl("img", "", "asteroidImage")
        img.src = "/images/asteroids.jpg"
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

    function spawnCards(container, arr){
        for (const el of arr) {
            container.append(createAsteroidCard(el.name,
                 el.close_approach_data[0].close_approach_date_full,
                  el.estimated_diameter.meters.estimated_diameter_min,
                   el.close_approach_data[0].miss_distance.lunar,
                    el.is_potentially_hazardous_asteroid))
        }
    }

    