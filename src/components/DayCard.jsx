export default function DayCard({ dayData, index, isSelected, onClick }) {
    
    const imageURL = `https://openweathermap.org/img/wn/${dayData.icon}@2x.png`

    return(
        <div 
            className={`day-card ${isSelected ? 'selected' : ''}`}
            onClick={onClick}
        >
            <h1 className="day-name">{dayData.dayName}</h1>
            <div>
                <img className="day-icon" src={imageURL} alt={dayData.description} />
                <p className="day-temp">{Math.round(dayData.maxTemp)}° / {Math.round(dayData.minTemp)}°</p>
            </div>
            {isSelected && 
                <div className="day-extra">
                    <p>Feels like: {Math.round(dayData.avgFeelsLike)}°C</p>
                    <p>Humidity: {Math.round(dayData.avgHumidity)}%</p>
                    <p>Wind: {Math.round(dayData.avgWind)} m/s</p>
                </div>
            }
        </div>
    )
}