const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export async function fetchCityWeatherData(city){
    try{
        const currentResponse = await fetch(`${BASE_URL}/weather?q=${city}&units=metric&appid=${API_KEY}`)
        if (!currentResponse.ok){
            throw new Error("City not found!")
        }
        const currentData = await currentResponse.json()

        const forecastResponse = await fetch(`${BASE_URL}/forecast?q=${city}&units=metric&appid=${API_KEY}`)
        const forecastData = await forecastResponse.json()

        return{
            current: currentData,
            forecast: forecastData
        }
    }
    catch (error){
        console.error("Error while fetching weather data:", error)
        throw error
    }
}