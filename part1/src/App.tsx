import React from 'react'

function App() {
    const course: Course = {
        name: 'Half Stack application development',
        parts: [
            { title: 'Fundamentals of React', exercises: 10 },
            { title: 'Using props to pass data', exercises: 7 },
            { title: 'State of a component', exercises: 14 },
        ],
    }

    return (
        <div>
            <Header course={course} />
            <Content course={course} />
            <Total course={course} />
        </div>
    )
}

const Header = ({ course }: { course: Course }) => {
    return <h1>{course.name}</h1>
}

const Content = ({ course }: { course: Course }) => {
    return (
        <div>
            {course.parts.map((part) => (
                <Part part={part} />
            ))}
        </div>
    )
}

const Part = ({ part }: { part: Part }) => {
    return (
        <p key={part.title}>
            {part.title} {part.exercises}
        </p>
    )
}
const Total = ({ course }: { course: Course }) => {
    return (
        <p>
            Number of exercises{' '}
            {course.parts.reduce((sum, current) => sum + current.exercises, 0)}
        </p>
    )
}
interface Course {
    name: string
    parts: Part[]
}

interface Part {
    title: string
    exercises: number
}

export default App
