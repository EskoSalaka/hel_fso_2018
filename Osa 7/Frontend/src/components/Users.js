import React from 'react'
import { Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Users = ({ users }) => {
  return (
    <div>
      <h2>Users</h2>
      <div>
        <Table bordered striped>
          <thead>
            <tr>
              <th>User</th>
              <th>Blogs</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <User key={u._id} user={u} />
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  )
}

const User = ({ user }) => {
  return (
    <tr>
      <td>
        <Link to={`/users/${user._id}`}>{user.name}</Link>
      </td>
      <td>{user.blogs.length}</td>
    </tr>
  )
}

export default Users
