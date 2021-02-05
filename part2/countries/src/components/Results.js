import { React, useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({ country }) => {
  const api_key = process.env.REACT_APP_API_KEY
  const [ lat, lon ] = country.latlng
  const api_url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`
  const [ weather, setWeather ] = useState(null)
  useEffect(() => {
    axios
      .get(api_url)
      .then(response => {
        setWeather(response.data)
      })
  }, [api_url])
  return (
    <div>
      <h2>Weather in {country.name}</h2>
      <p><b>temperature: </b>{weather?weather.main.temp:''}</p>
      <p><b>wind speed: </b>{weather?weather.wind.speed:''} m/s</p>
      <p><b>wind direction: </b>{weather?weather.wind.deg:''} degrees</p>
    </div>
  )
}

const CountryInfo = ({ country }) => {
  return (
    <div>
        <div>
          <h2>{country.name}</h2>
          <p>Capital: {country.capital}</p>
          <p>Population: {country.population} people</p>
        </div>
        <div>
          <h2>Spoken languages</h2>
          <ul>
            {country.languages.map(lang => 
              <li key={lang.name}>{lang.name}</li>
            )}
          </ul>
          <img src={country.flag} alt={`${country.name}'s flag`} height="150px" width="150px"></img>
        </div>
        <Weather country={country} />
    </div>
  )
}

const MatchingCountry = ({ matchingCountry }) => {
  const [country, setCountry] = useState(null)
  return (
    country ? 
    (
      <CountryInfo country={country} />
    )
    :
    (
    <p>
      {matchingCountry.name}
      <button onClick={() => setCountry(matchingCountry)}>show</button>
    </p>
    )
  )
}

const Results = ({ matchingCountries }) => {
  if(!matchingCountries || matchingCountries.length === 0) {
    return (<></>)
  }
  else if(matchingCountries.length > 10) {
    return (
      <p>Too many matches, please enter a narrower search</p>
    )
  }
  else if(matchingCountries.length <= 10 && matchingCountries.length > 1) {
    return (
      <>
      {matchingCountries.map(country => 
        <MatchingCountry key={country.name} matchingCountry={country} />
      )}
      </>
    )
  }
  else if(matchingCountries.length === 1) {
    return (
      <CountryInfo country={matchingCountries[0]} />
    )
  }
}

export default Results