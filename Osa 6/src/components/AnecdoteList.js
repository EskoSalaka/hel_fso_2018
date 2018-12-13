import React from 'react'
import { vote } from '../reducers/anecdoteReducer'
import Filter from './Filter'
import {
  setNotification,
  resetNotification
} from '../reducers/notificationReducer'
import { setTimer } from '../reducers/timerReducer'
import { connect } from 'react-redux'
import anecdoteService from '../services/anecdotes'

class AnecdoteList extends React.Component {
  handleVote = async (e, anecdote) => {
    e.preventDefault()

    await anecdoteService.vote(anecdote)
    this.props.vote(anecdote.id)
    this.props.setNotification(`Voted for anecdote "${anecdote.content}"`)

    if (this.props.timer) {
      clearTimeout(this.props.timer)
      this.props.setTimer(
        setTimeout(() => {
          this.props.resetNotification()
        }, 5000)
      )
    } else {
      this.props.setTimer(
        setTimeout(() => {
          this.props.resetNotification()
        }, 5000)
      )
    }
  }

  render() {
    return (
      <div>
        <h2>Anecdotes</h2>
        <Filter />
        {this.props.visibleAnecdotes.map(anecdote => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={e => this.handleVote(e, anecdote)}>vote</button>
            </div>
          </div>
        ))}
      </div>
    )
  }
}

const anecdotesToShow = (anecdotes, filter) => {
  return anecdotes
    .filter(a => a.content.includes(filter))
    .sort((a, b) => b.votes - a.votes)
}

// There is supposed to be only one state prop but i took the liberty to add
//another one, the global "timer" for handling the timing of notifications
const mapStateToProps = state => {
  return {
    timer: state.timer,
    visibleAnecdotes: anecdotesToShow(state.anecdotes, state.filter)
  }
}

const mapDispatchToProps = {
  setNotification,
  resetNotification,
  vote,
  setTimer
}

const ConnectedAnecdoteList = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)

export default ConnectedAnecdoteList
