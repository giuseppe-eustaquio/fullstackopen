require('dotenv').config();

const mongoose = require('mongoose');

const url = process.env.MONGODB_URI;

mongoose.set('strictQuery', false);

mongoose.connect(url);

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
});

const Blog = mongoose.model('Blog', blogSchema);

const blog = new Blog({
  title: 'test first blog',
  author: 'Blabla',
  url: 'test first URL',
  like: 5,
});

blog.save().then((result) => {
  console.log('blog saved!');
  mongoose.connection.close();
});
