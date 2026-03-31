import { useState, useEffect } from 'react'
import Header from "./components/Header"
import SearchBar from "./components/SearchBar"
import CurrentWeather from './components/CurrentWeather'
import WeeklyForecast from './components/WeeklyForecast'
import { fetchCityWeatherData } from './services/weatherAPI'
import { getDayName, calculateAverage, getMostCommon } from "./utils/helpers"

export default function App(){
  
  const [city, setCity] = useState("Tashkent")
  const [weatherData, setWeatherData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [selectedDay, setSelectedDay] = useState(null)

  async function searchCity(city){
    setLoading(true)
    setError(null)
    try{
      const data = await fetchCityWeatherData(city)
      setWeatherData(data)
      setCity(city)
    }
    catch(err){
      setError(err.message)
      console.error("Failed to fetch weather:", err)
    }
    finally{
      setLoading(false)
    }
  }

  useEffect(()=>{searchCity("Tashkent")},[])

  function processWeeklyForecast(forecastData){
    const dailyData = {}

    forecastData.list.forEach(item =>{
      const date = item.dt_txt.split(' ')[0]

      if (!dailyData[date]){
        dailyData[date] = {
          temps: [],
          description: [],
          icon: [],
          wind: [],
          humidity: [],
          feels_like: []
        }
      }

      dailyData[date].temps.push(item.main.temp)
      dailyData[date].description.push(item.weather[0].description)
      dailyData[date].icon.push(item.weather[0].icon)
      dailyData[date].wind.push(item.wind.speed)
      dailyData[date].humidity.push(item.main.humidity)
      dailyData[date].feels_like.push(item.main.feels_like)
    })
    const weeklyArray = Object.entries(dailyData).map(([date, data]) => {
      return {
        date: date,
        dayName: getDayName(date),
        maxTemp: Math.max(...data.temps),
        minTemp: Math.min(...data.temps),
        avgTemp: calculateAverage(data.temps), 
        description: getMostCommon(data.description), 
        icon: getMostCommon(data.icon), 
        avgWind: calculateAverage(data.wind),
        avgHumidity: calculateAverage(data.humidity),
        avgFeelsLike: calculateAverage(data.feels_like)
      }
    })
    return weeklyArray
  }

  const weeklyData = weatherData ? processWeeklyForecast(weatherData.forecast) : []

  return(
    <div className="app-container">
      <Header/>
      <SearchBar searchCity={searchCity}/>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {weatherData && 
        <>
          <CurrentWeather data={weatherData.current} />
          <WeeklyForecast 
            weeklyData={weeklyData}
            selectedDay={selectedDay}
            setSelectedDay={setSelectedDay}
          />
        </>
      }
    </div>
  )
}