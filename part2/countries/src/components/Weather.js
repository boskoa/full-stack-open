import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({ filter }) => {
  const [weather, setWeather] = useState()
  const api_key = process.env.REACT_APP_OW_KEY
  const api_url = `http://api.openweathermap.org/data/2.5/weather?q=${filter}&units=metric&appid=${api_key}`

  useEffect(() => {
    axios
      .get(api_url)
      .then(response => {
        setWeather(response.data)
      })
  }, [api_url, filter])

  return (
    <div>
      <h2>Weather in {filter}</h2>
      {weather && (
        <div>
          <p>Temperature: {weather['main']['temp']} ˚C</p>
          <p>Description: {weather['weather'][0]['description']}</p>
          <p>Wind speed: {weather['wind']['speed']} m/s</p>
        </div>
        )}
    </div>
  )
}

export default Weather