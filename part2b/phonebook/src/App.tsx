import { useState } from 'react'
import { ContactType } from './types'
import Form from './components/Form'
import Contact from './components/Contact'

const App = () => {
    const [persons, setPersons] = useState<ContactType[]>([
        { name: 'Arto Hellas', id: -1, number: '23094' },
    ])

    return (
        <div>
            <h2>Phonebook</h2>
            <Form persons={persons} setPersons={setPersons} />
            <h2>Numbers</h2>
            {persons.map((person) => (
                <Contact person={person} key={person.id} />
            ))}
        </div>
    )
}

export default App
