import React from 'react'

const Contact = ({ person }: { person: { name: string } }) => {
    return <div>{person.name}</div>
}

export default Contact
