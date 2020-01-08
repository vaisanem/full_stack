import React, {useState, useEffect} from 'react'
import './App.css'
import Country from './Country'

const axios = require('axios')
const url = "https://restcountries.eu/rest/v2/"

function App() {
  const [query, setQuery] = useState('')
  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState(null)
  let countriesToShow = countries.filter(one => 
    one.toLowerCase().includes(query.toLowerCase())
  )

  const inputListener = (event) => {
    setQuery(event.target.value)
    countriesToShow = countries.filter(one => 
      one.toLowerCase().includes(event.target.value.toLowerCase())
    )
    if (countriesToShow.length === 1) {
      searchCountryData(countriesToShow[0]).then(response => {
        setCountry(response.data[0])
      })
    } else {
      setCountry(null)
    }
  }

  const buttonListener = (country) => {
    searchCountryData(country).then(response => {
      setQuery(country)
      setCountry(response.data[0])
    })
  }

  useEffect(() => {
    axios.get(url + 'all').then(response => {
      setCountries(response.data.map(one => one.name))
    })
  }, [])

  const searchCountryData = (name) => {
    return axios.get(url + 'name/' + name)
  }

  return (
    <div style={{margin: '10px'}}>
      <div>
        <br></br>
        <>find countries </>
        <input value={query} onChange={inputListener}></input>
      </div>
      {countriesToShow.length <= 10 ?
      country ? 
      <Country country={country} /> :
      <div>
        {countriesToShow.map(one => 
          <p key={one}>{one} <button onClick={() => buttonListener(one)}>show</button></p>
        )}
      </div> :
      <p>Filter provided too many matches</p>}
    </div>
  )
}

export default App
