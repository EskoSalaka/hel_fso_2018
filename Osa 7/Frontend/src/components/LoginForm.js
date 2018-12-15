import React from 'react'
import PropTypes from 'prop-types'
import { ControlLabel, FormGroup, FormControl, Button } from 'react-bootstrap'

const LoginForm = ({ handleSubmit, handleChange, username, password }) => {
  return (
    <div>
      <h2>Login to application</h2>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <ControlLabel>Username</ControlLabel>
          <FormControl
            name="username"
            type="text"
            value={username}
            onChange={handleChange}
          />
          <ControlLabel>Password</ControlLabel>
          <FormControl
            name="password"
            type="password"
            value={password}
            onChange={handleChange}
          />
          <Button bsStyle="success" type="submit">
            Login
          </Button>
        </FormGroup>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default LoginForm
