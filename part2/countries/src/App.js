import {React, useState, useEffect } from 'react'
import Filter from './components/Filter'
import Results from './components/Results'
import axios from 'axios'

const App = () => {
  const [ countries, setCountries ] = useState([])
  const [ matchingCountries, setMatchingCountries ] = useState([])

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const searchCountries = (e) => {
    let query = e.target.value.toLowerCase()
    setMatchingCountries(countries.filter(country => country.name.toLowerCase().includes(query)))
  }

  return (
    <div>
      <Filter text='Find countries: ' onChange={searchCountries} />
      <Results matchingCountries={matchingCountries} />
    </div>
  )
}
  
export default App