import DayCard from "./DayCard"

export default function WeeklyForecast({weeklyData, selectedDay, setSelectedDay}){

    return(
        <div className="weekly-container">
            {weeklyData.map((day,index) =>(
                <DayCard
                    key={index}
                    onClick={() => setSelectedDay(selectedDay === index ? null : index)}
                    isSelected={selectedDay===index}
                    dayData={day}
                    index={index}
                />
            ))}
        </div>
    )
}