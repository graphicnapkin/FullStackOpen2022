import React from 'react'
import { ContactType } from '../types'

const Contact = ({ person }: { person: ContactType }) => {
    return (
        <div>
            {person.name} {person.number}{' '}
        </div>
    )
}

export default Contact
