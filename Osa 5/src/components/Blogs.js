import React from 'react';

class Blog extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      expanded: false
    };

    this.toggleExpanded = this.toggleExpanded.bind(this);
  }

  toggleExpanded = () => {
    this.setState({ expanded: !this.state.expanded });
  };

  render() {
    const blogStyle = {
      paddingTop: 5,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 3,
      marginBottom: 5
    };

    return (
      <div style={blogStyle}>
        <BlogTitle
          blog={this.props.blog}
          handleTitleClick={this.toggleExpanded}
        />
        {this.state.expanded ? (
          <HiddenLines
            blog={this.props.blog}
            handleLikeButtonClick={this.props.addLike}
          />
        ) : null}
      </div>
    );
  }
}

const BlogTitle = ({ blog, handleTitleClick }) => {
  return (
    <p onClick={handleTitleClick}>
      {blog.title} {blog.author}
    </p>
  );
};

const HiddenLines = ({ blog, handleLikeButtonClick }) => {
  return (
    <div>
      <a href={'//' + blog.url}>{blog.url}</a>

      <p>
        {' '}
        {blog.likes} Likes{' '}
        <button type="like" onClick={handleLikeButtonClick} value={blog._id}>
          Like
        </button>
      </p>
      <p> Added by {blog.user.name}</p>
    </div>
  );
};

const Blogs = ({ blogs, addLike }) => {
  return (
    <div>
      <h2>Blogs</h2>
      <div>
        {blogs.map(b => (
          <Blog key={b._id} blog={b} addLike={addLike} />
        ))}
      </div>
    </div>
  );
};

export default Blogs;
