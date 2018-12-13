import React from 'react'
import { create } from '../reducers/anecdoteReducer'
import {
  setNotification,
  resetNotification
} from '../reducers/notificationReducer'

class AnecdoteForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      timer: null
    }
  }

  handleSubmit = e => {
    e.preventDefault()
    const content = e.target.anecdote.value
    this.props.store.dispatch(create(content))

    e.target.anecdote.value = ''

    this.props.store.dispatch(
      setNotification(`Added new anecdote "${content}"`)
    )

    if (this.state.timer) {
      clearTimeout(this.state.timer)
      this.setState({
        timer: null
      })
    }

    this.setState({
      timer: setTimeout(() => {
        this.props.store.dispatch(resetNotification())
      }, 5000)
    })
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

export default AnecdoteForm
