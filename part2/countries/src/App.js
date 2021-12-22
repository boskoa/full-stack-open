import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Country from './components/Country'

const App = () => {
  //const [country, setCountry] = useState('')
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  const [filteredCountries, setFilteredCountries] = useState([])

  //const handleCountryChange = event => setCountry(event.target.value)
  const handleFilterChange = event => setFilter(event.target.value)
  /*
  const handleFilteredCountriesChange = event => {
    setFilteredCountries(countries.filter(country =>
      country.name.common.toLowerCase() === filter.toLowerCase()))
  }
*/
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
            <Country country={filteredCountries[0]} /> :
            filteredCountries.map(member =>
              <div key={member.name.common}>{member.name.common}</div>) :
          <div>Too many matches, specify another filter</div>
        }
        
      </div>
    </div>
  )
}

export default App