
import React, {useState} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory
} from "react-router-dom";
import Header from './Header/Header';
import Favorites from './Favorites/Favorites';
import Weather from './Weather/Weather';
import './App.scss';
import WeatherCard from './weatherCard/WeatherCard'

  const api = {
    key: "	7iHysR1Bkuznzzto23CLDMIA7b0GFLRR",
    base: "http://dataservice.accuweather.com",
  }
  function App() {
  
    const [query, setQuery] = useState('');
    const [weather, setWeather] = useState([]);
    const [weather5Days, setWeather5Days] = useState([]);
  
    const findCityCode = (event) => {
      let country = '';
      let cityName = '';
      let keyCode = '';
      if(event.key === "Enter") {
        fetch(`${api.base}/locations/v1/cities/autocomplete?apikey=${api.key}&q=${query}`)
         .then(res => res.json())
         .then(result => { 
            setQuery('');  
            country = result[0].Country.LocalizedName;
            cityName = result[0].LocalizedName;
            keyCode = result[0].Key;
            return result[0].Key
            console.log(result);
         })
         .then(keyCode =>  
          fetch(`${api.base}/currentconditions/v1/${keyCode}?apikey=${api.key}&details=true`)
         )
         .then(res=> res.json())
         .then(result => {
           result[0].cityName = cityName;
           result[0].country = country;
           setWeather(result);
         })
         .then(() => 
         fetch(`${api.base}/forecasts/v1/daily/5day/${keyCode}?apikey=${api.key}&metric=true`)
         )
         .then(res=> res.json())
         .then(result => {
          console.log(result);
           const data = [ //can I do it more elegant?
             {day: result.DailyForecasts[0].Date,
              maxTemp: result.DailyForecasts[0].Temperature.Maximum.Value,
              minTemp: result.DailyForecasts[0].Temperature.Minimum.Value,
              },
              {day: result.DailyForecasts[1].Date,
              maxTemp: result.DailyForecasts[1].Temperature.Maximum.Value,
              minTemp: result.DailyForecasts[1].Temperature.Minimum.Value,
              },
              {day: result.DailyForecasts[2].Date,
              maxTemp: result.DailyForecasts[2].Temperature.Maximum.Value,
              minTemp: result.DailyForecasts[2].Temperature.Minimum.Value,
              },
              {day: result.DailyForecasts[3].Date,
              maxTemp: result.DailyForecasts[3].Temperature.Maximum.Value,
              minTemp: result.DailyForecasts[3].Temperature.Minimum.Value,
              },
              {day: result.DailyForecasts[4].Date,
              maxTemp: result.DailyForecasts[4].Temperature.Maximum.Value,
              minTemp: result.DailyForecasts[4].Temperature.Minimum.Value,
              },  
           ]
           setWeather5Days(data);
         })
      }
    }
  
    console.log({weather5Days})
    console.log(weather);
  
    return (
    <Router>
      <div className="App">
        <div className="container App-container">
          <Header />
          <Switch>
            <Route path="/favorites">
                  <Favorites />
            </Route>
            <Route path="/" exact>
              <Weather weather={weather} query={query} findCityCode={findCityCode} setQuery={setQuery} />
              <div className="row">
                {/* {weather5Days.map(weather1Day => (
                  
                ))} */}
                {(weather[0]) ? (<WeatherCard weatherName={weather[0].cityName} weatherDegree={weather[0].Temperature.Metric.Value} weather5Days={weather5Days} />)
                  : null}
                </div>
            </Route>
          </Switch> 
        </div>
      </div>
    </Router>
    );
  }

export default App;
