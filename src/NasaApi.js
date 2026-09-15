//tOrrEVAmkqSnlbf5QcUBPCrfWOuqPplOzbi2JveA
 const APIKey = "tOrrEVAmkqSnlbf5QcUBPCrfWOuqPplOzbi2JveA"
export default async function getAPOD(date){ //date in YYYY-MM-DD only. or just empty string to get the freshest image
    try{
        const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${APIKey}&date=${date}`)
        if(!response.ok){
            throw new Error(`Error: ${response.status}`)
        }
        const data = await response.json()
        console.log(data)
        return data
    } catch(error){
        console.log(error)
    }
}