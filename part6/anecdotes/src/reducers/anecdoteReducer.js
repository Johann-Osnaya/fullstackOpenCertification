import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from "../services/anecdoteService"

const anecdoteSlice = createSlice({
    name: 'anecdotes',
    initialState: [],
    reducers: {
        voteAnecdote(state, action) {
            return state.map(anecdote => anecdote.id !== action.payload ? anecdote : {...anecdote, numberOfVotes: anecdote.numberOfVotes + 1})
        },
        appendAnecdote(state, action) {
            state.push(action.payload)
        },
        setAnecdotes(state, action) {
            return action.payload
        }
    }
})

export const {voteAnecdote, appendAnecdote, setAnecdotes} = anecdoteSlice.actions

export const initializeAnecdote = () => {
    return async dispatch => {
        const anecdotes = await anecdoteService.getAll()
        dispatch(setAnecdotes(anecdotes))
    }
}

export const createAnecdote = anecdote => {
    return async dispatch => {
        const newAnecdote = await anecdoteService.createNew(anecdote)
        dispatch(appendAnecdote(newAnecdote))
    }
}

export const updateVotes = (id, anecdote) => {
    
    return async dispatch => {
        const updatedAnecdote = await anecdoteService.addVote(id, { ...anecdote, numberOfVotes: anecdote.numberOfVotes + 1 })
        dispatch(voteAnecdote(updatedAnecdote.id))
    }
}

export default anecdoteSlice.reducer