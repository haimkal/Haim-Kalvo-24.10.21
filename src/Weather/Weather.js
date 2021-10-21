import PropTypes from 'prop-types'
import React from 'react'
import './Weather.scss'

export default function Weather({weather, query, findCityCode, setQuery}) {

  

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

   Weather.propTypes = {
       weather: PropTypes.shape({
          name: PropTypes.string,
          main: PropTypes.shape({
            temp: PropTypes.number
          }),
          sys: PropTypes.shape ({
              country: PropTypes.string
          })
       })
   }
    
    return (
    <div className="weather">
        <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? "myContainer warm" : "myContainer") : "myContainer"}>
          <main>
            <div className="search-box">
              <input 
                type="text"
                className="search-bar"
                placeholder="Search..."
                onChange={(event)=> setQuery(event.target.value)}
                value={query}
                onKeyPress={findCityCode}
                />
            </div>
            {(weather[0]) ? (
            <div>
              <div className="location-box">
                <div className="location">{weather[0].cityName}, {weather[0].country}</div>
                <div className="date">{dateBuilder(new Date())}</div>
              </div>
                <div className="weather-container">
                  <div className="weather-box">
                    <div className="temp">
                      {Math.round(weather[0].Temperature.Metric.Value)}°C
                    </div>
                  </div>
                  {/* <div className="description">{weather.weather[0].main}</div> */}
              </div>
            </div>
            ) : ('')}
          </main>
        </div>
    </div>
    )
}
