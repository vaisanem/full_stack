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

const App = () => {
  // tallenna napit omaan tilaansa
  let attributes = useState(0)
  const good = { name: "hyvä", count: attributes[0], listener: attributes[1] }
  attributes = useState(0)
  const neutral = { name: "neutraali", count: attributes[0], listener: attributes[1] }
  attributes = useState(0)
  const bad = { name: "huono", count: attributes[0], listener: attributes[1] }
  const styles = {display: 'inline-block'}

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
        <Stats properties = {good}/>
        <Stats properties = {neutral}/>
        <Stats properties = {bad}/>
      </div>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)