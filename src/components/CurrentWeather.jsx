export default function CurrentWeather({data}){

    if(!data) return null

    const iconCode = data.weather[0].icon
    const imageURL = `https://openweathermap.org/img/wn/${iconCode}@2x.png`
    const temp = Math.round(data.main.temp)
    console.log(data)
    return(
        <div className="current-weather">
            <h1 className="city-name">{data.name}</h1>
            <div className="temp-box">
                <img  className="weather-icon" src={imageURL} alt="There is a weather icon" />
                <p className="temperature">{temp}°C</p>
            </div>
            <p className="description">{data.weather[0].description}</p>
            <div className="weather-extra">
                <p>Feels like: {data.main.feels_like}°C </p>
                <p>Humidity: {data.main.humidity} %</p>
                <p>Wind: {data.wind.speed} m/s</p>
            </div>
        </div>
    )
}