import React from 'react'
import { Course } from '../types'
import Part from './Part'

const Content = ({ course }: { course: Course }) => {
    return (
        <div>
            {course.parts.map((part) => (
                <Part part={part} key={part.id} />
            ))}
        </div>
    )
}

export default Content
