import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({onClick, text}) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const Statistic = ({text, value}) => {
  return (
    <tr>
      <td>{text}: </td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  let all = good + neutral + bad
  if (all === 0) {
    return (
      <>
        <p>No feedback given</p>
        <p>Please provide feedback by clicking one of the three buttons in the section above</p>
      </>
    )
  }

  return (
    <table>
      <thead></thead>
      <tbody>
        <Statistic text="good" value={good} />
        <Statistic text="neutral" value={neutral} />
        <Statistic text="bad" value={bad} />
        <Statistic text="all" value={all} />
        <Statistic text="average" value={(good + -1*bad)/all} />
        <Statistic text="positive" value={((good/all) * 100) + ' %'} />
      </tbody>
    </table>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <div>
        <h1>give feedback</h1>
        <Button onClick={() => setGood(good + 1)} text='good' />
        <Button onClick={() => setNeutral(neutral + 1)} text='neutral' />
        <Button onClick={() => setBad(bad + 1)} text='bad' />
       </div>
       <div>
         <h1>statistics</h1>
         <Statistics good={good} neutral={neutral} bad={bad} />
       </div>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))

