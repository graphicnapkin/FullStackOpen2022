import React from 'react'
import { PartType } from '../types'

const Part = ({ part }: { part: PartType }) => {
    return (
        <p key={part.title}>
            {part.title} {part.exercises}
        </p>
    )
}
export default Part
