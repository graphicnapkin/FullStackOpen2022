import React from 'react'
import { Course } from '../types'

const Total = ({ course }: { course: Course }) => {
    return (
        <p>
            Number of exercises{' '}
            {course.parts.reduce((sum, current) => sum + current.exercises, 0)}
        </p>
    )
}
export default Total
