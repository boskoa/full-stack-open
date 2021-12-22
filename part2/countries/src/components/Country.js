import React from "react"

const Country = ({ country }) => {
  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population}</p>
      <ul>
        {Object.keys(country.languages).map(k =>
            <li key={country.languages[k]}>{country.languages[k]}</li>
          )}
      </ul>
      <img src={country.flags['png']} alt="flag" width="200" />
    </div>
  )
}

export default Country