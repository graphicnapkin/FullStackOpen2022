import React, { useState } from 'react'
import { ContactType } from '../types'

const Form = ({ persons, setPersons }: FormProps) => {
    const [nextId, setNextId] = useState(5)
    const [newContact, setNewContact] = useState<ContactType>({
        name: '',
        number: '',
        id: 0,
    })
    const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (persons.some((person) => person.name === newContact.name)) {
            window.alert(`${newContact.name} is already added to the phonebook`)
            return
        }

        setNewContact({
            ...newContact,
            id: nextId,
        })
        setPersons([...persons, newContact])
        setNextId(nextId + 1)
    }

    return (
        <div>
            <h1>add a new</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    name:{' '}
                    <input
                        onChange={(e) =>
                            setNewContact({
                                ...newContact,
                                name: e.target.value,
                            })
                        }
                        value={newContact.name}
                    />
                    <br />
                    number:{' '}
                    <input
                        onChange={(e) =>
                            setNewContact({
                                ...newContact,
                                number: e.target.value,
                            })
                        }
                        value={newContact.number}
                    />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
                <div>debug: {newContact.name}</div>
            </form>
        </div>
    )
}

interface FormProps {
    persons: ContactType[]
    setPersons: React.Dispatch<React.SetStateAction<ContactType[]>>
}

export default Form
