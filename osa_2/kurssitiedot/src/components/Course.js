import React from 'react'
import Header from './Header'

const Part = ({ part }) => {

  return (
    <p>
      {part.name} {part.exercises}
    </p>
  )  
}

const Total = ({ parts }) => {
  const exercises = parts.reduce(
    (all, part) => all + part.exercises, 0
  )

  return (
    <p>
      yhteensä {exercises} tehtävää
    </p>
  )
}

const Content = ({ parts }) => {
  const all = parts.map( 
    one => <Part key = {one.key} part = {one}/> 
  )

  return <div> {all} </div>
}

const Course = ({ course }) => {

  return (
    <div>
      <Header name = {course.name}/>
      <Content parts = {course.parts}/>
      <Total parts = {course.parts}/>
    </div>
  )
}

export default Course