const Course = ({ courses }) => {
  return (
    <div>
      <h1>Web development curriculum</h1>
      {courses.map((course) => {
        return (
          <div key={course.id}>
            <h1>{course.name}</h1>
            {course.parts.map((part) => (
              <p key={part.id}>
                {part.name} {part.exercises}
              </p>
            ))}
            <b>
              total of{' '}
              {course.parts.reduce((acc, cur) => (acc += cur.exercises), 0)}
            </b>
          </div>
        );
      })}
    </div>
  );
};

export default Course;
