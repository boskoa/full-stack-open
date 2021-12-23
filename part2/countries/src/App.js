import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Country from './components/Country'
import Weather from './components/Weather'

const App = () => {

  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  const [filteredCountries, setFilteredCountries] = useState([])
  
  const handleFilterChange = event => setFilter(event.target.value)

  useEffect(() => {
    setFilteredCountries(countries.filter(country =>
      country.name.common.toLowerCase().includes(filter.toLowerCase())))
  }, [filter, countries])

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all?fields=name,capital,population,languages,flags')
      .then(response => setCountries(response.data))
  }, [])

  return (
    <div>
      Find countries: <input type="text" value={filter} onChange={handleFilterChange} />
      <div>
        {filteredCountries.length < 10 ?
          filteredCountries.length === 1 ?
            <div>
              <Country country={filteredCountries[0]} />
              <Weather filter={filteredCountries[0].capital} />
            </div> :
            filteredCountries.map(member =>
              <div key={member.name.common}>{member.name.common}<button onClick={() =>
                setFilter(member.name.common)}>show</button></div>) :
          <div>Too many matches, specify another filter</div>
        }
        
      </div>
    </div>
  )
}

export default App