import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';
import Togglable from './components/Togglable';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (exception) {
      console.log(exception);
      setError(exception.message);
      console.log('exception message is ', exception.message);
      console.log('error is ', error);
      setTimeout(() => {
        setError(null);
      }, 5000);
    }
  };

  const handleLogout = (e) => {
    e.preventDefault();

    window.localStorage.clear();
    setUser(null);
    setUsername('');
    setPassword('');
  };

  const addBlog = async (blogObject) => {
    console.log('new blog ', blogObject);
    console.log('user is ', user);
    try {
      const returnedBlog = await blogService.create(blogObject);
      setBlogs(blogs.concat(returnedBlog));

      setMessage('Added successfully');
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    } catch (error) {
      console.log('error message is ', error);
      setError(error.message);
      setTimeout(() => {
        setError(null);
      }, 5000);
    }
  };

  const addLike = async (blogObject) => {
    console.log('user is', user);
    console.log('likes is', blogObject.likes);
    console.log('new likes is ', blogObject.likes + 1);
    blogObject.likes = blogObject.likes + 1;
    try {
      const returnedBlog = await blogService.update(blogObject);
      blogService.getAll().then((blogs) => setBlogs(blogs));
      console.log('liked successfully', returnedBlog);
    } catch (error) {
      console.log('error message is ', error);
      setError(error.message);
      setTimeout(() => {
        setError(null);
      }, 5000);
    }
  };

  const removeBlog = async (blogObject) => {
    blogObject.user = user;
    console.log(blogObject);
    try {
      console.log('blogObject for request', blogObject);
      const returnedBlog = await blogService.remove(blogObject);
      blogService.getAll().then((blogs) => setBlogs(blogs));
      console.log('deleted successfully', returnedBlog);
    } catch (error) {
      console.log('error message is ', error);
      setError(error.message);
      setTimeout(() => {
        setError(null);
      }, 5000);
    }
  };

  const Notification = ({ message }) => {
    if (message === null) {
      return null;
    }
    return <div className="notification"> {message}</div>;
  };

  const Error = ({ errorMessage }) => {
    if (errorMessage === null) {
      return null;
    }
    return <div className="error"> {errorMessage}</div>;
  };

  const loginForm = () => {
    return (
      <Togglable buttonLabel="login">
        <LoginForm
          handleSubmit={handleLogin}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          username={username}
          password={password}
        />
      </Togglable>
    );
  };

  const blogForm = () => {
    return (
      <Togglable label="create new" buttonLabel="new note">
        <BlogForm createBlog={addBlog} />
      </Togglable>
    );
  };

  if (user === null) {
    return (
      <div>
        <Error errorMessage={error} />
        {loginForm()}
      </div>
    );
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} />
      <Error errorMessage={error} />
      <p>{user.name} logged in</p>
      <button onClick={handleLogout}>logout</button>
      {blogForm()}
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            user={user.name}
            addLike={addLike}
            removeBlog={removeBlog}
          />
        ))}
    </div>
  );
};

export default App;
