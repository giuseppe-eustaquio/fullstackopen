require('dotenv').config();

const mongoose = require('mongoose');

const url = process.env.TEST_MONGODB_URI;

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
  title: 'test env second blog',
  author: 'Bleble',
  url: 'test env second URL',
  like: 1,
});

blog.save().then((result) => {
  console.log('blog saved!', result);
  mongoose.connection.close();
});
