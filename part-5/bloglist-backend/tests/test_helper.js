const Blog = require('../models/blog');
const User = require('../models/user');

const initialBlogs = [
  {
    title: 'test env first blog',
    author: 'Blabla',
    url: 'test env firstURL',
    likes: 1,
  },

  {
    title: 'test env second blog',
    author: 'Bleble',
    url: 'test env second URL',
    likes: 2,
  },
];

const newUser = {
  username: 'root',
  password: 'salainen',
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((u) => u.toJSON());
};
module.exports = {
  initialBlogs,
  newUser,
  blogsInDb,
  usersInDb,
};
