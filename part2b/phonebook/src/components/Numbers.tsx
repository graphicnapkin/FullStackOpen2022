import React from 'react'
import { ContactType } from '../types'
import Contact from './Contact'

const Numbers = ({ persons, setPersons, filter}: NumbersProps) => {
    return (
        <div>
            <h1>Numbers</h1>
            {persons
                .filter(
                    (person) =>
                        person.name.match(filter) || person.number.match(filter)
                )
                .map((person) => (
                    <Contact person={person} persons={persons} setPersons={setPersons} key={person.id} />
                ))}
        </div>
    )
}

interface NumbersProps {
    persons: ContactType[]
    setPersons: React.Dispatch<React.SetStateAction<ContactType[]>>
    filter: string
}

export default Numbers
