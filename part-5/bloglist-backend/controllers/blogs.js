const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

const getTokenFrom = (request) => {
  const authorization = request.get('authorization');

  if (authorization && authorization.startsWith('Bearer')) {
    return authorization.replace('Bearer ', '');
  }
  return null;
};

blogsRouter.get('/', async (request, response) => {
  // using await
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
  return response.json(blogs);

  // using then
  // Blog.find({}).then((blogs) => {
  //   response.json(blogs);
  // });
});

blogsRouter.post('/', async (request, response) => {
  const body = request.body;
  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET);

  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' });
  }

  if (!body.title | !body.url) {
    return response.status(400).end();
  }

  const user = await User.findById(decodedToken.id);
  console.log('user is ', user);

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes ? body.likes : 0,
    user: user._id,
  });

  // using await
  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();
  response.status(201).json(savedBlog);

  // using then
  // blog.save().then((result) => {
  //   response.status(201).json(result);
  // });
});

blogsRouter.delete('/:id', async (request, response) => {
  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' });
  }
  const blog = await Blog.findById(request.params.id);
  const user = await User.findById(decodedToken.id);
  console.log('blog is ', blog);
  if (blog.user.toString() === user.id.toString()) {
    await Blog.findByIdAndDelete(request.params.id);
    response.status(204).end();
  } else {
    return response
      .status(401)
      .json({ error: 'cannot delete another user`s blog' });
  }
});

blogsRouter.put('/:id', async (request, response, next) => {
  try {
    const { likes } = request.body;

    const blog = await Blog.findById(request.params.id);
    if (!blog) {
      return response.status(404).end();
    }

    blog.likes = likes;
    const updatedBlog = await blog.save();
    return response.json(updatedBlog);
  } catch (error) {
    next(error);
  }
});

module.exports = blogsRouter;
