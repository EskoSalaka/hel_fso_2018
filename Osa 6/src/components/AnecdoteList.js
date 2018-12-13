import React from 'react'
import { vote } from '../reducers/anecdoteReducer'
import Filter from './Filter'
import { connect } from 'react-redux'
import anecdoteService from '../services/anecdotes'
import { notify } from '../reducers/notificationReducer'

class AnecdoteList extends React.Component {
  handleVote = async (e, anecdote) => {
    e.preventDefault()

    await anecdoteService.vote(anecdote)
    this.props.vote(anecdote)
    this.props.notify(`Voted for anecdote "${anecdote.content}"`, 5)
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
    visibleAnecdotes: anecdotesToShow(state.anecdotes, state.filter)
  }
}

const mapDispatchToProps = {
  notify,
  vote
}

const ConnectedAnecdoteList = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)

export default ConnectedAnecdoteList
