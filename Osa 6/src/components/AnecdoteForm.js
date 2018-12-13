import React from 'react'
import { create } from '../reducers/anecdoteReducer'
import { setTimer } from '../reducers/timerReducer'
import { connect } from 'react-redux'
import {
  setNotification,
  resetNotification
} from '../reducers/notificationReducer'

class AnecdoteForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault()
    const content = e.target.anecdote.value
    this.props.create(content)

    e.target.anecdote.value = ''

    this.props.setNotification(`Added new anecdote "${content}"`)

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
        <h2>create new</h2>
        <form onSubmit={this.handleSubmit}>
          <div>
            <input name="anecdote" />
          </div>
          <button>create</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return { timer: state.timer }
}

const mapDispatchToProps = {
  setNotification,
  resetNotification,
  create,
  setTimer
}

const ConnectedAnecdoteForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteForm)

export default ConnectedAnecdoteForm
