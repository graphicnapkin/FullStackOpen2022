import React from 'react'
import Header from './components/Header'
import Content from './components/Content'
import Total from './components/Total'

import { Course } from './types'

function App() {
    const courses: Course[] = [
        {
            id: 1,
            name: 'Half Stack application development',
            parts: [
                { title: 'Fundamentals of React', exercises: 10, id: 1 },
                { title: 'Using props to pass data', exercises: 7, id: 2 },
                { title: 'State of a component', exercises: 14, id: 3 },
                { title: 'Redux', exercises: 11, id: 4 },
            ],
        },
        {
            id: 2,
            name: 'Node.js',
            parts: [
                { title: 'Routing', exercises: 3, id: 1 },
                { title: 'Middlewares', exercises: 7, id: 2 },
            ],
        },
    ]

    return (
        <div>
            {courses.map((course) => (
                <div key={course.id}>
                    <Header course={course} />
                    <Content course={course} />
                    <Total course={course} />
                </div>
            ))}
        </div>
    )
}

export default App
