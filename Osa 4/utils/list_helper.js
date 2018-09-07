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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
};
