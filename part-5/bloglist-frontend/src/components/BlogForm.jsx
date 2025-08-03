import { useState } from 'react';
import PropTypes from 'prop-types';

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [newUrl, setNewUrl] = useState('');

  const addBlog = (event) => {
    event.preventDefault();
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    });
    setNewTitle('');
    setNewAuthor('');
    setNewUrl('');
  };
  return (
    <form onSubmit={addBlog}>
      <div>
        title:
        <input
          type="text"
          name="Title"
          id="title"
          value={newTitle}
          onChange={(event) => setNewTitle(event.target.value)}
        />
      </div>
      <div>
        author:
        <input
          type="text"
          name="Author"
          id="author"
          value={newAuthor}
          onChange={(event) => setNewAuthor(event.target.value)}
        />
      </div>
      <div>
        url:
        <input
          type="text"
          name="URL"
          id="url"
          value={newUrl}
          onChange={(event) => setNewUrl(event.target.value)}
        />
      </div>
      <br></br>
      <input id="submit" type="submit" value="Create" />
    </form>
  );
};

export default BlogForm;
