import { useDispatch, useSelector } from "react-redux"
import { updateVotes, voteAnecdote } from "../reducers/anecdoteReducer"
import { displayNotification } from "../reducers/notificationReducer"
const Anecdote = ({ anecdote, numberOfVotes, vote, id }) => {
    return (
        <div>
            {anecdote}
            <br/>
            has {numberOfVotes} <button onClick={() => vote(id)}>vote</button>
        </div>
    )
}

const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(({anecdotes, filter}) => {
        if(filter === '') {
            return [...anecdotes]
        } else {
            return anecdotes.filter(anecdote => anecdote.anecdote.includes(filter))
        }
    })
    return (
        <>
        {anecdotes.sort((a,b) => a.numberOfVotes < b.numberOfVotes ? 1 : -1).map(anecdote => 
            <Anecdote 
              key={anecdote.id} 
              anecdote={anecdote.anecdote} 
              numberOfVotes={anecdote.numberOfVotes} 
              vote={() =>{ 
                dispatch(updateVotes(anecdote.id, anecdote))
                dispatch(displayNotification(`you voted '${anecdote.anecdote}'`, 5))
            }}  
              id={anecdote.id}/>)}
        </>        
    )
}

export default AnecdoteList