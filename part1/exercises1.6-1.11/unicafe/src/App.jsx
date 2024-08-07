import { useState } from 'react'
const Button = (props) =>{
  return(
  <button onClick = {props.handleClick}>{props.text}</button>
  )
}
const StatisticLine = (props) =>{
  return(<tr>
          <td>{props.feedback}</td> 
          <td>{props.value}</td>
        </tr>)
}
const Statistics = (props) =>{
  if (props.noInput){
    return(<p>No feedback given</p>)
  }
  return(
  <table>
    <StatisticLine feedback = "good" value = {props.good}/>
    <StatisticLine feedback = "neutral" value = {props.neutral}/>
    <StatisticLine feedback = "bad" value = {props.bad}/>
    <StatisticLine feedback = "average" value = {props.average}/>
    <StatisticLine feedback = "positive" value = {props.positive}/>
  </table>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  let total = good + neutral + bad
  let positive = (good / total) * 100
  let average = ((good * 1) + (neutral * 0) + (bad * -1)) / total
  let noInput = (total == 0)

  return (
    <div>
      <h1>Give FeedBack</h1>
      <Button handleClick={() => setGood(good + 1)} text = "good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text = "neutral" />
      <Button handleClick={() => setBad(bad + 1)} text = "bad" />
      <h1>Statistics</h1>
      <Statistics good = {good} neutral = {neutral} bad = {bad} average = {average} positive = {positive} noInput={noInput}/>

    </div>
  )
}

export default App
