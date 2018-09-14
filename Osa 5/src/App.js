import React from 'react';
import Blogs from './components/Blog';
import LoginForm from './components/login_form';
import blogService from './services/blogs';
import loginService from './services/login';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      loggedinUsername: '',
      user: null,
      error: '',
      newBlog: '',
      blogs: []
    };

    this.handleLoginFieldChange = this.handleLoginFieldChange.bind(this);
    this.login = this.login.bind(this);
  }

  componentDidMount() {
    blogService.getAll().then(blogs => this.setState({ blogs }));
  }

  login = async event => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      });

      this.setState({
        username: '',
        password: '',
        loggedinUsername: user.username,
        user: user.token
      });
    } catch (exception) {
      console.log(exception);

      this.setState({
        error: 'käyttäjätunnus tai salasana virheellinen'
      });
      setTimeout(() => {
        this.setState({ error: null });
      }, 5000);
    }
  };

  handleLoginFieldChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const loginView = () => {
      return (
        <LoginForm
          username={this.state.username}
          password={this.state.password}
          handleChange={this.handleLoginFieldChange}
          handleSubmit={this.login}
        />
      );
    };

    const loggedInView = () => {
      return (
        <div>
          <p>logged in as {this.state.loggedinUsername} </p>
          <Blogs blogs={this.state.blogs} />
        </div>
      );
    };

    return <div>{this.state.user === null ? loginView() : loggedInView()}</div>;
  }
}

export default App;
