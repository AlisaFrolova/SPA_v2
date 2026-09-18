//tOrrEVAmkqSnlbf5QcUBPCrfWOuqPplOzbi2JveA
 const APIKey = "tOrrEVAmkqSnlbf5QcUBPCrfWOuqPplOzbi2JveA"
export async function getAPOD(date){ //date in YYYY-MM-DD only. or just empty string to get the freshest image
    try{
        const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${APIKey}&date=${date}`)
        if(!response.ok){
            throw new Error(`Error: ${response.status}`)
        }
        const data = await response.json()
        return data
    } catch(error){
        console.log(error)
    }
}

export async function getAsteroids(){ //date format is the same; 2-3 days = 35-65 asteroids
     try{
        const response = await fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=2026-09-09&end_date=2026-09-11&api_key=${APIKey}`)
        if(!response.ok){
            throw new Error(`Error: ${response.status}`)
        }
        const data = await response.json()
        return data
    } catch(error){
        console.log(error)
    }
}