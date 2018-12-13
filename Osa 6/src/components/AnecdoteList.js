import React from 'react'
import { vote } from '../reducers/anecdoteReducer'
import Filter from './Filter'
import {
  setNotification,
  resetNotification
} from '../reducers/notificationReducer'

class AnecdoteList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      timer: null
    }
  }

  handleVote = (e, anecdote) => {
    e.preventDefault()

    this.props.store.dispatch(vote(anecdote.id))
    this.props.store.dispatch(
      setNotification(`Voted for anecdote "${anecdote.content}"`)
    )

    if (this.state.timer) {
      console.log(this.state.timer)

      clearTimeout(this.state.timer)
      this.setState({ timer: null })
    }

    this.setState({
      timer: setTimeout(() => {
        this.props.store.dispatch(resetNotification())
      }, 5000)
    })
  }

  render() {
    const anecdotes = this.props.store.getState().anecdotes
    const filter = this.props.store.getState().filter
    return (
      <div>
        <h2>Anecdotes</h2>
        <Filter store={this.props.store} />
        {anecdotes
          .filter(a => a.content.includes(filter))
          .sort((a, b) => b.votes - a.votes)
          .map(anecdote => (
            <div key={anecdote.id}>
              <div>{anecdote.content}</div>
              <div>
                has {anecdote.votes}
                <button onClick={e => this.handleVote(e, anecdote)}>
                  vote
                </button>
              </div>
            </div>
          ))}
      </div>
    )
  }
}

export default AnecdoteList
