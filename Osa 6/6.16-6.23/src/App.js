import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import {
  ListGroup,
  ListGroupItem,
  Grid,
  Row,
  Col,
  Image,
  ControlLabel,
  FormGroup,
  FormControl,
  Button,
  Navbar,
  NavItem,
  Nav
} from 'react-bootstrap'

const Menu = () => {
  //Old styles replaced by bootstrap
  /* const menuStyle = {
    color: 'green',
    fontStyle: 'bold',
    fontSize: 24,
    backgroundColor: 'tan',
    fontWeight: 'bold',
    padding: '5px'
  }

  const activeStyle = {
    color: 'black',
    fontStyle: 'bold',
    fontSize: 24,
    backgroundColor: 'lightGrey'
  } */

  return (
    <Navbar inverse collapseOnSelect>
      <Navbar.Header>
        <Navbar.Brand>Anecdote app</Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav>
          <NavItem href="#">
            <Link to="/">Anecdotes</Link>
          </NavItem>
          <NavItem href="#">
            <Link to="/create">Create new anecdote</Link>
          </NavItem>
          <NavItem href="#">
            <Link to="/about">About</Link>
          </NavItem>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

const Anecdote = ({ anecdote }) => (
  <div>
    <h2>{anecdote.content}</h2>
    <p>Has {anecdote.votes} votes</p>
    <p>
      For more info see <a href={anecdote.info}>here</a>
    </p>
  </div>
)

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ListGroup>
      {anecdotes.map(anecdote => (
        <ListGroupItem key={anecdote.id}>
          {' '}
          <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
        </ListGroupItem>
      ))}
    </ListGroup>
  </div>
)

const Notification = ({ message }) => {
  const notificationStyle = {
    color: 'green',
    fontStyle: 'bold',
    fontSize: 20,
    borderStyle: 'outset',
    borderRadius: '5px',
    backgroundColor: 'lightblue',
    display: 'inline-block',
    padding: '5px'
  }

  if (message === null || message.length === 0) {
    return null
  }

  return <div style={notificationStyle}>{message}</div>
}

const About = () => (
  <div>
    <Grid>
      <Row>
        <Col xs={12}>
          <h2>About anecdote app</h2>
        </Col>
        <Col xs={8}>
          <Col>
            <p>According to Wikipedia:</p>
          </Col>
          <Col>
            <em>
              An anecdote is a brief, revealing account of an individual person
              or an incident. Occasionally humorous, anecdotes differ from jokes
              because their primary purpose is not simply to provoke laughter
              but to reveal a truth more general than the brief tale itself,
              such as to characterize a person by delineating a specific quirk
              or trait, to communicate an abstract idea about a person, place,
              or thing through the concrete details of a short narrative. An
              anecdote is "a story with a point."
            </em>
          </Col>
          <Col>
            <br />
            <p>
              Software engineering is full of excellent anecdotes, at this app
              you can find the best and add more.
            </p>
          </Col>
        </Col>
        <Col xs={4}>
          <Image
            src="https://sdtimes.com/wp-content/uploads/2015/05/GOSLINGJAMES.jpg"
            headers="80%"
            width="80%"
          />
        </Col>
      </Row>
    </Grid>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for{' '}
    <a href="https://courses.helsinki.fi/fi/TKT21009/121540749">
      Full Stack -sovelluskehitys
    </a>
    . See{' '}
    <a href="https://github.com/mluukkai/routed-anecdotes">
      https://github.com/mluukkai/routed-anecdotes
    </a>{' '}
    for the source code.
  </div>
)

class CreateNew extends React.Component {
  constructor() {
    super()
    this.state = {
      content: '',
      author: '',
      info: ''
    }
  }

  handleChange = e => {
    console.log(e.target.name, e.target.value)
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.addNew({
      content: this.state.content,
      author: this.state.author,
      info: this.state.info,
      votes: 0
    })

    this.props.history.push('/')
  }

  render() {
    return (
      <div>
        <h2>create a new anecdote</h2>
        <form onSubmit={this.handleSubmit}>
          <FormGroup>
            <ControlLabel>Author</ControlLabel>
            <FormControl
              type="text"
              name="author"
              value={this.state.author}
              onChange={this.handleChange}
            />
            <ControlLabel>URL for more info</ControlLabel>
            <FormControl
              type="text"
              name="info"
              value={this.state.info}
              onChange={this.handleChange}
            />
            <ControlLabel>Content</ControlLabel>
            <FormControl
              componentClass="textarea"
              type="text"
              name="content"
              value={this.state.content}
              onChange={this.handleChange}
            />
            <Button bsStyle="success" type="submit">
              Create
            </Button>
          </FormGroup>
        </form>
      </div>
    )
  }
}

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      anecdotes: [
        {
          content: 'If it hurts, do it more often',
          author: 'Jez Humble',
          info:
            'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
          votes: 0,
          id: '1'
        },
        {
          content: 'Premature optimization is the root of all evil',
          author: 'Donald Knuth',
          info: 'http://wiki.c2.com/?PrematureOptimization',
          votes: 0,
          id: '2'
        }
      ],
      notification: ''
    }
  }

  addNew = anecdote => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    this.setState({
      anecdotes: this.state.anecdotes.concat(anecdote),
      notification: `Added new notification "${anecdote.content}"`
    })

    setTimeout(() => {
      this.setState({
        notification: ''
      })
    }, 10000)
  }

  anecdoteById = id => this.state.anecdotes.find(a => a.id === id)

  vote = id => {
    const anecdote = this.anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    const anecdotes = this.state.anecdotes.map(a => (a.id === id ? voted : a))

    this.setState({ anecdotes })
  }

  render() {
    return (
      <div className="container">
        <h1>Software anecdotes</h1>
        <Router>
          <div>
            <Menu />
            <Notification
              message={this.state.notification}
              type={this.state.type}
            />
            <Route
              exact
              path="/"
              render={() => <AnecdoteList anecdotes={this.state.anecdotes} />}
            />
            <Route
              path="/create"
              render={({ history }) => (
                <CreateNew addNew={this.addNew} history={history} />
              )}
            />
            <Route path="/about" render={() => <About />} />
            <Route
              exact
              path="/anecdotes/:id"
              render={({ match }) => (
                <Anecdote anecdote={this.anecdoteById(match.params.id)} />
              )}
            />
          </div>
        </Router>

        <Footer />
      </div>
    )
  }
}

export default App
