import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BlogForm from './BlogForm';
import { test } from 'vitest';

const blog = {
  title: 'test title here',
  author: 'test author here',
  url: 'test url here',
  likes: 4,
};

test('adds blog', async () => {
  const createBlogFn = vi.fn();
  const component = render(<BlogForm createBlog={createBlogFn} />);
  const user = userEvent.setup();

  const titleText = component.container.querySelector('#title');
  const authorText = component.container.querySelector('#author');
  const urlText = component.container.querySelector('#url');
  const submitButton = component.container.querySelector('#submit');

  await user.type(titleText, blog.title);
  await user.type(authorText, blog.author);
  await user.type(urlText, blog.url);
  await user.click(submitButton);

  expect(createBlogFn.mock.calls).toHaveLength(1);
  expect(createBlogFn.mock.calls[0][0].title).toBe(blog.title);
  expect(createBlogFn.mock.calls[0][0].url).toBe(blog.url);
  expect(createBlogFn.mock.calls[0][0].author).toBe(blog.author);
});
