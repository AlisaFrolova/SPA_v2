//tOrrEVAmkqSnlbf5QcUBPCrfWOuqPplOzbi2JveA
 const APIKey = "tOrrEVAmkqSnlbf5QcUBPCrfWOuqPplOzbi2JveA"
export async function getAPOD(date){ //date in YYYY-MM-DD only; wotk with img NF
    try{
        const response = await fetch(`https://science.nasa.gov/wp-json/wp/v2/apod-basic/`)
        if(!response.ok){
            throw new Error(`Error: ${response.status}`)
        }
        const data = await response.json()
        return data
    } catch(error){
        console.log(error)
    }
}//https://science.nasa.gov/wp-json/wp/v2/apod-basic/{20260909}
//https://science.nasa.gov/wp-json/wp/v2/apod-basic/?api_key=${APIKey}&date=${date}

export async function getAsteroids(startDate, endDate){ //date format is the same; 2-3 days = 35-65 asteroids
     try{
        const response = await fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=${APIKey}`)
        if(!response.ok){
            throw new Error(`Error: ${response.status}`)
        }
        const data = await response.json()
        return data
    } catch(error){
        console.log(error)
    }
}