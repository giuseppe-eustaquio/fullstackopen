import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from './Blog';
import { test } from 'vitest';

const blog = {
  title: 'test title here',
  author: 'test author here',
  url: 'test url here',
  likes: 4,
};

test('renders content', () => {
  render(<Blog blog={blog} />);

  const title = screen.getByText('test title here');
  const author = screen.getByText('test author here');
  const url = screen.getByText('test url here');
  const likes = screen.getByText('4');
  expect(title).toBeDefined();
  expect(author).toBeDefined();
  !expect(url).toBeDefined();
  !expect(likes).toBeDefined();
});

test('shows url and likes after clicking', async () => {
  render(<Blog blog={blog} />);
  const user = userEvent.setup();
  const button = screen.getByText('hide');
  await user.click(button);
  const url = screen.getByText('test url here');
  const likes = screen.getByText('4');

  expect(url).toBeDefined();
  expect(likes).toBeDefined();
});

test('like button works', async () => {
  const likeFn = vi.fn();
  render(<Blog blog={blog} addLike={likeFn} />);
  const user = userEvent.setup();
  const button = screen.getByText('like');
  await user.click(button);
  await user.click(button);
  expect(likeFn.mock.calls).toHaveLength(2);
});
