import { useState } from 'react'

const Button = (props) => {
  return(
    <button onClick = {props.handleClick}>{props.text}</button>
  )
}
const Winner = (props) => {
  if (props.points[props.index] == 0){
    return(
      <p>To vote, click the "vote" button</p>
    )
  }
  return(
    <div>
      <h1>Anecdote with the most votes</h1>
      <p>{props.anecdotes[props.index]} has {props.points[props.index]} vote(s)</p>
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  const length = anecdotes.length;

  const [points, setPoints] = useState(new Array(length).fill(0))
  const [selected, setSelected] = useState(0)
  let randQuote = Math.floor(Math.random() * ((anecdotes.length-1) - 0 + 1)) + 0;
  const handlePoints = () => {
    let copy = [ ...points]
    copy[selected] += 1
    return setPoints(copy)
  }
  const maxIndex = (lst) => {
    let max = 0
    for(let i = 0; i < lst.length; i++){
      if (lst[i] > lst[max]){
        max = i
      }
    }
    return max
  }
  let maxvotes = maxIndex(points)
  return (
    <div>
      <h1>anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <Button handleClick = {() => setSelected(randQuote)} text = "Next quote"/>
      <Button handleClick = {handlePoints} text = "Vote"/>
      <Winner index = {maxvotes} anecdotes = {anecdotes} points = {points}/>
    </div>
  )
}

export default App
