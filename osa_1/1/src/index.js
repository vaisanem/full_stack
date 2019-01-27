import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  return (
    <h1>
      {props.course}
    </h1>
  )  
}

const Part = (props) => {
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>
  )  
}

const Total = (props) => {
  return (
    <p>
      yhteensä {props.exercises} tehtävää
    </p>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part part = {props.parts[0]}/>
      <Part part = {props.parts[1]}/>
      <Part part = {props.parts[2]}/>
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack -sovelluskehitys',
    parts: [
      {
        name: 'Reactin perusteet',
        exercises: 10
      },  
      {
        name: 'Tiedonvälitys propseilla',
        exercises: 7
      },  
      {
        name: 'Komponenttien tila',
        exercises: 14
      }
    ]  
  }

  return (
    <div>
      <Header course = {course.name}/>
      <Content parts = {course.parts}/>
      <Total exercises = {course.parts.reduce(
        (all, part) => all + part.exercises, 0
      )}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))