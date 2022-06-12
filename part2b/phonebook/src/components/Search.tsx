import React, { useState } from 'react'

const Search = ({ filter, setFilter }: SearchProps) => {
    return (
        <div>
            filter shown with
            <input value={filter} onChange={(e) => setFilter(e.target.value)} />
            <br />
        </div>
    )
}

interface SearchProps {
    filter: string
    setFilter: React.Dispatch<React.SetStateAction<string>>
}

export default Search
