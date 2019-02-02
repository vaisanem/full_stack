import React from 'react'
import ReactDOM from 'react-dom'
import Course from './components/Course'
import Header from './components/Header'

const App = () => {
  const courses = [
    {
      key: 1,
      name: 'Half Stack -sovelluskehitys',
      parts: [
        {
          key: 1,
          name: 'Reactin perusteet',
          exercises: 10
        },  
        {
          key: 2,
          name: 'Tiedonvälitys propseilla',
          exercises: 7
        },  
        {
          key: 3,
          name: 'Komponenttien tila',
          exercises: 14
        },
        {
          key: 5,
          name: 'Kertausta',
          exercises: 9
        }
      ]  
    },
    {
      key: 2,
      name: 'Node.js',
      parts: [
        {
          key: 1,
          name: 'Routing',
          exercises: 2,
        },
        {
          key: 2,
          name: 'Middlewaret',
          exercises: 7,
        }
      ]
    } 
  ]

  const all = courses.map( 
    one => <Course key = {one.key} course = {one}/> 
  )

  return (
    <div>
      <Header name = "Opetusohjelma"/>
      {all}
    </div>
  )  
}

ReactDOM.render(<App />, document.getElementById('root'))