import React, { useState } from 'react'

const App = () => {
    const [anecdotes, setAnecdotes] = useState<AnecdoteType[]>([
        { text: 'If it hurts, do it more often', votes: 0 },
        {
            text: 'Adding manpower to a late software project makes it later!',
            votes: 0,
        },
        {
            text: 'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
            votes: 0,
        },
        {
            text: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
            votes: 0,
        },
        {
            text: 'Premature optimization is the root of all evil.',
            votes: 0,
        },
        {
            text: 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
            votes: 0,
        },
        {
            text: 'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients',
            votes: 0,
        },
    ])

    const [selected, setSelected] = useState(0)

    const handleSelectAnecdote = (): void => {
        const newIndex = Math.floor(Math.random() * anecdotes.length)
        if (newIndex === selected) return handleSelectAnecdote()
        return setSelected(newIndex)
    }

    const handleVote = () => {
        const newAnecdontes = [...anecdotes]
        newAnecdontes[selected].votes++
        setAnecdotes(newAnecdontes)
    }

    return (
        <div>
            <Anecdote anecdote={anecdotes[selected]} />
            <Button onClick={handleVote} text="vote" />
            <Button onClick={handleSelectAnecdote} text="next anecdote" />
            <h1>Anecdote with most votes</h1>
            <Anecdote
                anecdote={[...anecdotes].sort((a, b) => b.votes - a.votes)[0]}
            />
        </div>
    )
}

const Button = ({
    text,
    onClick,
}: {
    text: string
    onClick: React.MouseEventHandler<HTMLButtonElement>
}) => {
    return <button onClick={onClick}>{text}</button>
}

const Anecdote = ({ anecdote }: { anecdote: AnecdoteType }) => {
    return (
        <div>
            {anecdote.text} <br />
            has {anecdote.votes} votes
        </div>
    )
}

interface AnecdoteType {
    text: string
    votes: number
}

export default App
