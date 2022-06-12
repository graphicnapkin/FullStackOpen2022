import { useState } from 'react'
import { ContactType } from './types'
import Filter from './components/Search'
import PersonForm from './components/Form'
import Numbers from './components/Numbers'

const App = () => {
    const [persons, setPersons] = useState<ContactType[]>([
        { name: 'Arto Hellas', number: '040-123456', id: 1 },
        { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
        { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
        { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
    ])

    const [filter, setFilter] = useState<string>('')

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter filter={filter} setFilter={setFilter} />
            <PersonForm persons={persons} setPersons={setPersons} />
            <Numbers persons={persons} filter={filter} />
        </div>
    )
}

export default App
