import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = ({header}) => <h2> {header} </h2>

const Button = ({properties}) => {
  const action = () => properties.listener(properties.count + 1)  

  return (
    <>
      <button onClick={action}> {properties.name} </button>
    </>
  )  
}

const Stats = ({properties}) => {

  return (
    <p> {properties.name} {properties.count} </p>
  )
}

const Statistics = ({attributes}) => {
  const [good, neutral, bad, all, average, positive] = attributes

  if (all.count === 0) return <p> ei palautteita </p>

  return (
    <>
      <Stats properties = {good}/>
      <Stats properties = {neutral}/>
      <Stats properties = {bad}/>
      <Stats properties = {all}/>
      <Stats properties = {average}/>
      <Stats properties = {positive}/>
    </>
  )
}

const sum = (votes) => {

  return votes.reduce((all, type) => all + type.count * type.value, 0)
}    

const App = () => {
  const styles = {display: 'inline-block'}
  // tallenna napit omaan tilaansa?
  let attributes = useState(0)
  const good = { name: "hyvä", count: attributes[0], listener: attributes[1], value: 1 }
  attributes = useState(0)
  const neutral = { name: "neutraali", count: attributes[0], listener: attributes[1], value: 0 }
  attributes = useState(0)
  const bad = { name: "huono", count: attributes[0], listener: attributes[1], value: -1 }
  const all = { name: "yhteensä", count: good.count + neutral.count + bad.count}
  const average = { name : "keskiarvo", count: sum([good, neutral, bad]) / all.count }
  const positive = { name: "positiivisia", count: (good.count / all.count) * 100 + " %"}
  attributes = [good, neutral, bad, all, average, positive]

  return (
    <div>
      <Header header="anna palautetta"/>
      <div style={styles}>
        <Button properties = {good}/>
        <Button properties = {neutral}/>
        <Button properties = {bad}/>
      </div>
      <Header header="statistiikka"/>
      <div>
        <Statistics attributes = {attributes}/>
      </div>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)