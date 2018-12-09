import React from 'react';
import Blogs from './components/Blogs';
import LoginForm from './components/LoginForm';
import NewBlogForm from './components/NewBlogForm';
import Togglable from './components/Togglable';
import ErrorNotification from './components/ErrorNotification';
import SuccessNotification from './components/SuccessNotification';
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
      error: null,
      success: null,
      author: '',
      title: '',
      url: '',
      blogs: []
    };

    this.handleTextFieldChange = this.handleTextFieldChange.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.postNewBlog = this.postNewBlog.bind(this);
  }

  componentDidMount = async () => {
    console.log('Component did mount');
    let blogs = await blogService.getAllBlogs();
    blogs = blogs.sort((a, b) => a.likes < b.likes);
    this.setState({ blogs });

    const loggedInUserJSON = window.localStorage.getItem('loggedInUser');
    if (loggedInUserJSON) {
      const loggedInUser = JSON.parse(loggedInUserJSON);

      this.setState({
        user: loggedInUser.token,
        loggedinUsername: loggedInUser.username
      });
      blogService.setToken(loggedInUser.token);
    }
  };

  login = async event => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      });

      window.localStorage.setItem('loggedInUser', JSON.stringify(user));
      blogService.setToken(user.token);

      this.setState({
        username: '',
        password: '',
        loggedinUsername: user.username,
        user: user.token,
        success: 'Logged in'
      });
      console.log(this.state.loggedinUsername);

      setTimeout(() => {
        this.setState({ success: null });
      }, 5000);
    } catch (exception) {
      console.log(exception);

      this.setState({
        error:
          'Something went wrong with logging in: ' +
          String(exception.response.data.error)
      });
      setTimeout(() => {
        this.setState({ error: null });
      }, 5000);
    }
  };

  logout = async event => {
    event.preventDefault();

    try {
      window.localStorage.removeItem('loggedInUser');
      blogService.setToken('');

      this.setState({
        loggedinUsername: '',
        user: null,
        success: 'Logged out'
      });

      setTimeout(() => {
        this.setState({ success: null });
      }, 5000);
    } catch (exception) {
      console.log(exception);

      this.setState({
        error: 'something went wrong logging out'
      });
      setTimeout(() => {
        this.setState({ error: null });
      }, 5000);
    }
  };

  postNewBlog = async event => {
    event.preventDefault();
    this.newBlogForm.toggleVisibility();

    try {
      const newBlog = {
        title: this.state.title,
        author: this.state.author,
        url: this.state.url
      };

      await blogService.addBlog(newBlog);

      this.setState({
        blogs: await blogService.getAllBlogs(),
        title: '',
        author: '',
        url: '',
        success: `A new blog "${newBlog.title}" by ${newBlog.author} added`
      });

      setTimeout(() => {
        this.setState({ success: null });
      }, 5000);
    } catch (exception) {
      this.setState({
        error:
          'something went wrong with posting new blog: ' +
          String(exception.response.data.error)
      });
      setTimeout(() => {
        this.setState({ error: null });
      }, 5000);
    }
  };

  addLike = async event => {
    event.preventDefault();
    let id = event.target.value;
    console.log(id);

    try {
      let blog = this.state.blogs.find(b => {
        return b._id === id;
      });

      const updatedBlog = {
        user: blog.user === undefined ? null : blog.user._id,
        likes: blog.likes + 1,
        author: blog.author,
        url: blog.url,
        title: blog.title
      };

      await blogService.updateBlog(event.target.value, updatedBlog);
      let blogs = await blogService.getAllBlogs();
      blogs = blogs.sort((a, b) => a.likes < b.likes);

      this.setState({
        blogs: blogs
      });
    } catch (exception) {
      this.setState({
        error:
          'something went wrong with liking: ' +
          String(exception.response.data.error)
      });
    }
  };

  deleteBlog = async event => {
    event.preventDefault();

    let blog = this.state.blogs.find(b => {
      return b._id === event.target.value;
    });

    if (window.confirm(`Delete "${blog.title}" by ${blog.author}?`)) {
      try {
        await blogService.deleteBlog(event.target.value);
        let blogs = await blogService.getAllBlogs();
        blogs = blogs.sort((a, b) => a.likes < b.likes);

        this.setState({ blogs: blogs });
      } catch (exception) {
        this.setState({
          error:
            'something went wrong with deleting post: ' +
            String(exception.response.data.error)
        });

        setTimeout(() => {
          this.setState({ error: null });
        }, 5000);
      }
    }
  };

  handleTextFieldChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const loginView = () => {
      return (
        <LoginForm
          username={this.state.username}
          password={this.state.password}
          handleChange={this.handleTextFieldChange}
          handleSubmit={this.login}
        />
      );
    };

    const loggedInView = () => {
      return (
        <div>
          <p>
            logged in as {this.state.loggedinUsername}{' '}
            <button onClick={this.logout}>log out</button>
          </p>
          <Togglable
            buttonLabel="New Blog"
            ref={component => (this.newBlogForm = component)}
          >
            <NewBlogForm
              handleSubmit={this.postNewBlog}
              handleChange={this.handleTextFieldChange}
              title={this.state.title}
              author={this.state.author}
              url={this.state.url}
            />
          </Togglable>
          <Blogs
            blogs={this.state.blogs}
            addLike={this.addLike}
            deleteBlog={this.deleteBlog}
            userName={this.state.loggedinUsername}
          />
        </div>
      );
    };

    return (
      <div>
        <ErrorNotification error={this.state.error} />
        <SuccessNotification success={this.state.success} />
        {this.state.user === null ? loginView() : loggedInView()}
      </div>
    );
  }
}

export default App;
