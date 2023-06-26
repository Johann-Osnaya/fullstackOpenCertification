const Header = ({name}) => {
    return (
      <h2>{name}</h2>
    )
  }
  
  const Content = ({parts}) => {
    return (
      <div>
        {
          parts.map(part => {
            return <Part part={part.name} exercises={part.exercises} />
          })
        }
      </div>
    )
  }
  
  const Part = ({part, exercises}) => {
    return (
      <p>{part} {exercises}</p>
    )
  }
  
  const Total = ({parts}) => {
    return (
      <div>
        <b> total of {parts.map(part => part.exercises).reduce((a,b) => a + b , 0)} excercises</b>
      </div>
    )
  }
  
  const Course = ({courses}) => {
  
    return (
      <div>
        <h1>Web development curriculum</h1>
        {courses.map(course => {
          return(
            <div>
          <Header name={course.name} />
          <Content parts={course.parts} />
          <Total parts={course.parts} />
            </div>
        )})}
      </div>
    )
  
  }
export default Course