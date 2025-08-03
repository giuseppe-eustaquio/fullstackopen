const _ = require('lodash');

const blogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0,
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0,
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0,
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0,
  },
];

const dummy = (blogs) => 1;

const totalLikes = (blogs) => {
  return blogs.reduce((total, cur) => total + cur.likes, 0);
};

const favoriteBlog = (blogs) => {
  return blogs.reduce((prev, cur) => {
    return prev.likes > cur.likes ? prev : cur;
  }, {});
};

const mostBlogs = (blogs) => {
  // without lodash
  // let tempObj = {};
  // blogs.map((blog) => {
  //   tempObj[blog.author] === undefined
  //     ? (tempObj[blog.author] = 1)
  //     : (tempObj[blog.author] += 1);
  // });
  // const mostBlogsAuthor = Object.keys(tempObj).reduce((a, b) =>
  //   tempObj[a] > tempObj[b] ? a : b
  // );
  // console.log(tempObj);

  // return { author: mostBlogsAuthor, blogs: tempObj[mostBlogsAuthor] };

  // with lodash
  const authorCount = _.countBy(blogs, 'author');
  const finalAuthor = Object.keys(authorCount).reduce((a, b) =>
    authorCount[a] > authorCount[b] ? a : b
  );
  return {
    author: finalAuthor,
    blogs: authorCount[finalAuthor],
  };
};

const mostLikes = (blogs) => {
  const tempObj = _(blogs)
    .groupBy('author')
    .mapValues((blog) => _.sumBy(blog, 'likes'))
    .value();
  const finalAuthor = Object.keys(tempObj).reduce((a, b) =>
    tempObj[a] > tempObj[b] ? a : b
  );
  return {
    author: finalAuthor,
    likes: tempObj[finalAuthor],
  };
};

console.log(mostLikes(blogs));
module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
