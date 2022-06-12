import React, { useEffect, useState } from 'react'
import { ContactType } from './types'
import Filter from './components/Search'
import PersonForm from './components/Form'
import Numbers from './components/Numbers'
import Persons from './components/api'
const App = () => {
    const [persons, setPersons] = useState<ContactType[]>([
        { name: '', number: '', id: NaN },
    ])
    const [filter, setFilter] = useState<string>('')

    useEffect(() => {
        Persons.then((res) => setPersons(res.data as ContactType[]))
    }, [Persons])

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
