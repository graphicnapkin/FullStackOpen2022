import React from 'react'
import { Course } from '../types'

const Header = ({ course }: { course: Course }) => {
    return <h1>{course.name}</h1>
}

export default Header
