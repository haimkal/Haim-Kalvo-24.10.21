import React from 'react'

export default function WeatherCard({weatherName, weatherDegree }) {
    return (
        <div>
           <div className="location-box">
                <div className="location">{weatherName}</div>
            </div>
            <div className="temp">
                {weatherDegree}      
            </div>
                  
            
        </div>
    )
}
