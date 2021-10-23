import React from 'react'

export default function WeatherCard({day, minTemp, maxTemp }) {

    
  const dateBuilder = (d) => {
    let months = ["January", "Febuary", "March", "April", "May", "June", "July", "August", 
    "September", "October", "November", "December"];

    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thurday", "Friday", "Saturday"];
    
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }
    return ( //how to gat a day
        <div>
           <div className="day-box">
                Day: <div className="day">{day}</div> 
            </div>
            <div className="maxTemp">
                Max: {maxTemp}      
            </div>
            <div className="minTemp">
                Min: {minTemp}      
            </div> 
        </div>
    )
}
