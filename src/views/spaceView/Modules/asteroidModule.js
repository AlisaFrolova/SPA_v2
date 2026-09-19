import { getAsteroids } from "../../../NasaApi.js"
import createEl from "../../tools.js"

export default function createAsteroidSection(){
    const asteroidContainer = createEl("div", "", "asteroidContainer")
    asteroidContainer.style.backgroundImage = `url(https://images-assets.nasa.gov/image/iss074e0472536/iss074e0472536~orig.jpg)`
    getAsteroids().then(asteroids => { //ADD SOME VALIDATION BEFORE !
        spawnCards(asteroidContainer, asteroids.near_earth_objects["2026-09-09"], "https://images-assets.nasa.gov/image/PIA23876/PIA23876~orig.jpg")
        spawnCards(asteroidContainer, asteroids.near_earth_objects["2026-09-10"], "https://images-assets.nasa.gov/image/PIA15506/PIA15506~orig.jpg")
        spawnCards(asteroidContainer, asteroids.near_earth_objects["2026-09-11"], "https://images-assets.nasa.gov/image/PIA02471/PIA02471~orig.jpg")
    })
    return asteroidContainer
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

    function spawnCards(container, arr, imgLink){
        for (const el of arr) {
            container.append(createAsteroidCard(el.name,
                 el.close_approach_data[0].close_approach_date_full,
                  el.estimated_diameter.meters.estimated_diameter_min,
                   el.close_approach_data[0].miss_distance.lunar,
                    el.is_potentially_hazardous_asteroid, imgLink))
        }
    }

    