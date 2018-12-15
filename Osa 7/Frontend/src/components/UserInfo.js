import React from 'react'
import { ListGroup, ListGroupItem } from 'react-bootstrap'
import userService from '../services/users'

class UserInfo extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      users: [],
      done: false
    }
  }

  componentDidMount = async () => {
    console.log('Component 2 did mount')
    let users = await userService.getAllUsers()
    this.setState({ users: users, done: true })
  }

  render() {
    if (this.state.done) {
      let user = this.state.users.find(u => u._id === this.props.id)
      return (
        <div>
          <h2>{user.name}</h2>
          <div>
            <h4>Added blogs</h4>
          </div>
          <div>
            <ListGroup>
              {user.blogs.map(b => (
                <ListGroupItem key={b._id}>
                  {b.title} by {b.author}
                </ListGroupItem>
              ))}
            </ListGroup>
          </div>
        </div>
      )
    } else {
      return <div />
    }
  }
}

export default UserInfo
