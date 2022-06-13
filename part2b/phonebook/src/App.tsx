import React, { useEffect, useState } from 'react'
import { ContactType } from './types'
import Filter from './components/Search'
import PersonForm from './components/Form'
import Contacts from './components/Numbers'
import {getContacts} from './components/api'
const App = () => {
    const [persons, setPersons] = useState<ContactType[]>([
        { name: '', number: '', id: NaN },
    ])
    const [filter, setFilter] = useState<string>('')
    useEffect(() => {
      const currentContacts = getContacts().then(contacts => setPersons(contacts))
    }, [])

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter filter={filter} setFilter={setFilter} />
            <PersonForm persons={persons} setPersons={setPersons} />
            <Contacts persons={persons} setPersons = {setPersons} filter={filter} />
        </div>
    )
}

export default App
