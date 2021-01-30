import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({text, onClick}) => {
    return (
      <button onClick={onClick}>{text}</button>
    )
  }
  
  const App = (props) => {
    const [selected, setSelected] = useState(0)
    const [votes, setVotes] = useState(
      // initialize votes to be a zero-filled array of size props.anecdotes.length
      new Array(props.anecdotes.length + 1).join('0').split('').map(parseFloat)
    )
  
    const voteForAnecdote = () => {
      const updatedVotes = [...votes]
      updatedVotes[selected]++
      setVotes(updatedVotes)
    }
  
    const selectNextAnecdote = () => setSelected(Math.floor( Math.random() * props.anecdotes.length))
  
    function indexOfMax(arr) {
      if(arr.length === 0) {
        return -1
      }
  
      let max = arr[0]
      let maxInd = 0;
      for(let i=1; i<arr.length; i++) {
        if(arr[i] > max) {
          max = arr[i]
          maxInd = i
        }
      }
      return maxInd;
    }
  
    return (
      <div>
        <div>
          <h1>Anecdote of the day</h1>
          <p style={{fontSize: "22px"}}>
            {props.anecdotes[selected]}
            <br />
            has {votes[selected]} votes
          </p>
          <Button onClick={voteForAnecdote} text="vote" />
          <Button onClick={selectNextAnecdote} text="next anecdote" />
        </div>
        <div>
          <h1>Anecdote with most votes</h1>
          <p style={{fontSize: "22px"}}>
            {props.anecdotes[indexOfMax(votes)]}
            <br />
            has {votes[indexOfMax(votes)]} votes
          </p>
        </div>
      </div>
    )
  }
  
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]
  
  ReactDOM.render(
    <App anecdotes={anecdotes} />,
    document.getElementById('root')
  )