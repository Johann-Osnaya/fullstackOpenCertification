import { useState } from 'react'


const Statistics = ({good, neutral, bad}) => {
  if((good + bad + neutral) >= 1)
  {
    return (
      <div>
        <h2>statistics</h2>
        <table>
          <tbody>
            <StatisticLine text={'good'} value={good} /> 
            <StatisticLine text={'neutral'} value={neutral} /> 
            <StatisticLine text={'bad'} value={bad} /> 
            <StatisticLine text={'all'} value={good + neutral + bad} />
            <StatisticLine text={'average'} value={(good * (1) + bad * (-1) + neutral * (0)) / ( good + neutral + bad)} />
            <StatisticLine text={'positive'} value={(good/(good + neutral + bad) * 100) + '%'} />
          </tbody>
        </table>
      </div>
    )
  } else {
    return (<p>No feedback given</p>)
  }
}

const Button = ({text, eventhandler}) => {
  return (
    <button onClick={eventhandler}>{text}</button>
  )
}

const StatisticLine = ({text, value}) => {
  return (
    <>
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
    </>
  )
}
 
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const voteGood = () => {
    setGood(good + 1)
  }

  const voteNeutral = () => {
    setNeutral(neutral + 1)
  }

  const voteBad = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <h2>give feedback</h2>
      <Button text={'good'} eventhandler={voteGood}/>
      <Button text={'neutral'} eventhandler={voteNeutral}/>
      <Button text={'bad'} eventhandler={voteBad}/>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App