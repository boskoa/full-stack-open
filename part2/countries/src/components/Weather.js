import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({ filter }) => {
  const [weather, setWeather] = useState()
  const apiKey = process.env.REACT_APP_OW_KEY
  const apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${filter}&units=metric&appid=${apiKey}`
  const [apiIcon, setApiIcon] = useState('')

  useEffect(() => {
    axios
      .get(apiUrl)
      .then(response => {
        setWeather(response.data)
        setApiIcon(`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`)
      })
  }, [apiUrl, filter])

  return (
    <div>
      <h2>Weather in {filter}</h2>
      {weather && (
        <div>
          <p>Temperature: {weather['main']['temp']} ˚C</p>
          <img alt="weather icon" src={apiIcon} />
          <p>Description: {weather['weather'][0]['description']}</p>
          <p>Wind speed: {weather['wind']['speed']} m/s</p>
        </div>
        )}
    </div>
  )
}

export default Weather