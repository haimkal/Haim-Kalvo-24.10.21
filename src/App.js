
import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory
} from "react-router-dom";
import {
  RecoilRoot, useRecoilState, useRecoilValue, useSetRecoilState
} from 'recoil';
import Header from './Header/Header';
import Favorites from './Favorites/Favorites';
import Weather from './Weather/Weather';
import './App.scss';
import WeatherCard from './WeatherCard/WeatherCard'
import { dailyWeatherSelector, inputSelector, weatherSelector, cityNameSelector, countrySelector } from './atom';

const api = {
  key: "jcf3AHrILpvFINyux2ERgdURUmGRriCg",
  base: "http://dataservice.accuweather.com",
}
function App() {

  // const setInputState = useSetRecoilState(inputSelector);
  // const input = useRecoilValue(inputSelector);
  // const [weather, setWeather] = useRecoilState(weatherSelector);
  // const [dailyWeather, setDailyWeather] = useRecoilState(dailyWeatherSelector);
  // const [cityName, setCityName] = useRecoilState(cityNameSelector);
  // const [country, setCountry] = useRecoilState(countrySelector);
  // const [input, setInput] = useRecoilState(inputSelector)

  const [input, setInput] = useState('');
  const [weather, setWeather] = useState([]);
  const [dailyWeather, setDailyWeather] = useState([]);

  const getCityWeather = (event) => {
    let country = '';
    let cityName = '';
    let keyCode = '';
    if (event.key === "Enter") {
      fetch(`${api.base}/locations/v1/cities/autocomplete?apikey=${api.key}&q=${input}`)
        .then(res => res.json())
        .then(result => {
          setInput('');
          country = result[0].Country.LocalizedName;
          cityName = result[0].LocalizedName;
          keyCode = result[0].Key;
          return result[0].Key
        })
        .then(keyCode =>
          fetch(`${api.base}/currentconditions/v1/${keyCode}?apikey=${api.key}&details=true`)
        )
        .then(res => res.json())
        .then(result => {
          result[0].cityName = cityName;
          result[0].country = country;
          setWeather(result);
        })
        .then(() =>
          fetch(`${api.base}/forecasts/v1/daily/5day/${keyCode}?apikey=${api.key}&metric=true`)
        )
        .then(res => res.json())
        .then(result => {
          console.log(result);
          const data = result.DailyForecasts.map(daily => ({
            day: daily.Date,
            maxTemp: daily.Temperature.Maximum.Value,
            minTemp: daily.Temperature.Minimum.Value,
            description: daily.Day.IconPhrase
          }))

          setDailyWeather(data);
        })
    }
  }

  console.log({ dailyWeather })
  console.log({ weather });

  return (
    <RecoilRoot>
      <Router>
        <div className="App">
          <div className="container App-container">
            <Header />
            <Switch>
              <Route path="/favorites">
                <Favorites />
              </Route>
              <Route path="/" exact>
                <Weather weather={weather} input={input} getCityWeather={getCityWeather} setInput={setInput} />
                <div className="row">
                  {(weather[0]) ? dailyWeather.map((weather1Day, index) => (
                    <WeatherCard key={index} day={weather1Day.day} maxTemp={weather1Day.maxTemp} minTemp={weather1Day.minTemp} />))
                    : null}
                </div>
              </Route>
            </Switch>
          </div>
        </div>
      </Router>
    </RecoilRoot>
  );
}

export default App;
