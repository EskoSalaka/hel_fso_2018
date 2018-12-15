let token = null;

const blogs = [
  {
    _id: '5b98c10da86d990ddc3c79d8',
    title: 'Test post 1',
    author: 'Erkki',
    url: 'www.microsoft1.com',
    likes: 1,
    user: {
      _id: '5b97d3ec0764922fcc6c5e20',
      username: 'Test User1',
      name: 'Erkki'
    }
  },
  {
    _id: '5b98c59906b706024c52a2ec',
    title: 'Test post 2',
    author: 'Erkki',
    url: 'www.microsoft2.com',
    likes: 100,
    user: {
      _id: '5b97d3ec0764922fcc6c5e20',
      username: 'Test User1',
      name: 'Erkki'
    }
  },
  {
    _id: '5b98c5a406b706024c52a2ed',
    title: 'Test post 3',
    author: 'Erkki',
    url: 'www.microsoft3.com',
    likes: 10000,
    user: {
      _id: '5b97d3ec0764922fcc6c5e20',
      username: 'Test User1',
      name: 'Erkki'
    }
  }
];

const getAllBlogs = () => {
  return Promise.resolve(blogs);
};

export default { getAllBlogs, blogs };
