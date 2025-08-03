import { useState } from 'react';

const Blog = ({ blog, addLike, removeBlog }) => {
  const [visible, setVisible] = useState(true);
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <div style={blogStyle}>
      <div className="titleAuthor">
        <li className="blog">{blog.title}</li>
        <li className="author"> {blog.author} </li>
        <button className="toggle" onClick={toggleVisibility}>
          {visible ? 'hide' : 'show'}
        </button>
      </div>
      <div style={{ display: visible ? '' : 'none' }}>
        <li className="url">{blog.url}</li>
        <li className="likes">
          {blog.likes} <button onClick={() => addLike(blog)}>like</button>
        </li>

        <button onClick={() => removeBlog(blog)}>remove</button>
      </div>
    </div>
  );
};

export default Blog;
