const Header = (props) => {
  return <h1>{props.course}</h1>;
};
const Part = (props) => {
  return (
    <p>
      {props.name} {props.exercises}
    </p>
  );
};

const Content = (props) => {
  let parts = props.parts
  return (
      <div>
        {parts.map(part =>
          <div key={part.id}>
            <Part key={part.id} name={part.name} exercises={part.exercises} />
          </div>
        )}
      </div>
  );
};

const Total = (props) => {
  const {parts} = props
  let exercises = parts.map(part => part.exercises);
  let sum = exercises.reduce((accumulator, currentValue) => {
    return accumulator + currentValue;
  }, 0);
  return <p>Total {sum}</p>;
};


const Course = (props) => {
  let courses = props.courses
  console.log(courses)
  return (
    <div>
      {courses.map(course =>
        <div key={course.name}>
        <Header course={course.name} />
        <Content parts = {course.parts}/>
        <Total parts = {course.parts}/>
        </div>
      )}
    </div>
  );
}

export default Course;
