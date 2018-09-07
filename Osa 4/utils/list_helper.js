const dummy = blogs => {
  return 1;
};

const totalLikes = blogs => {
  return blogs.length === 0
    ? 0
    : blogs.reduce((sum, blog) => sum + blog.likes, 0);
};

const favoriteBlog = blogs => {
  var favourite = null;

  if (blogs === null) {
    return null;
  }

  blogs.forEach(blog => {
    if (favourite === null || favourite.likes < blog.likes) {
      favourite = blog;
    }
  });

  return favourite;
};

const mostBlogs = blogs => {
  var authorsByBlogs = [];
  var authorWithMostBlogs = null;

  if (blogs === null) {
    return null;
  }

  blogs.forEach(blog => {
    if (authorsByBlogs.map(a => a.author).includes(blog.author)) {
      authorsByBlogs.find(a => a.author === blog.author).blogs++;
    } else {
      authorsByBlogs = authorsByBlogs.concat({
        author: blog.author,
        blogs: 1
      });
    }
  });

  //console.log(authorsByBlogs);

  authorsByBlogs.forEach(author => {
    if (
      authorWithMostBlogs === null ||
      authorWithMostBlogs.blogs < author.blogs
    ) {
      authorWithMostBlogs = author;
    }
  });

  return authorWithMostBlogs;
};

const mostLikes = blogs => {
  var authorsByLikes = [];
  var authorWithMostLikes = null;

  if (blogs === null) {
    return null;
  }

  blogs.forEach(blog => {
    if (authorsByLikes.map(a => a.author).includes(blog.author)) {
      authorsByLikes.find(a => a.author === blog.author).likes += blog.likes;
    } else {
      authorsByLikes = authorsByLikes.concat({
        author: blog.author,
        likes: blog.likes
      });
    }
  });

  //console.log(authorsByLikes);

  authorsByLikes.forEach(author => {
    if (
      authorWithMostLikes === null ||
      authorWithMostLikes.likes < author.likes
    ) {
      authorWithMostLikes = author;
    }
  });

  return authorWithMostLikes;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
};
