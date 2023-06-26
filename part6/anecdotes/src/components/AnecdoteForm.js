import { useDispatch } from "react-redux"
import { createAnecdote } from "../reducers/anecdoteReducer"
import { displayNotification, hideNotification } from "../reducers/notificationReducer"
import anecdoteService from "../services/anecdoteService"

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = async  (event) => {
        event.preventDefault()
        const anecdote = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(createAnecdote(anecdote))
        dispatch(displayNotification(`anecdote ${anecdote} created`,5))
        event.target.anecdote.value = ''
    }

    return (
        <form onSubmit={addAnecdote}>
        <input name="anecdote"/>
        <button type='submit'>Post</button>
      </form>
    )
}

export default AnecdoteForm