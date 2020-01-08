import React from 'react'

function Country({ country }) {

  return (
    <div>
      <h2>{country.name}</h2>
      <p>capital: {country.capital}</p>
      <p>population: {country.population}</p>
      <h4>languages</h4>
      <ul>
        {country.languages.map(one => <li key={one.name}>{one.name}</li>)}
      </ul>
      <img src={country.flag} alt="flag" width="100px"/>
    </div>
  )
}

export default Country