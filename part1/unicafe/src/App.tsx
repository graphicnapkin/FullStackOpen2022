import { useState } from 'react'

const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    return (
        <div>
            <Title />
            <Button title="good" onClick={() => setGood(good + 1)} />
            <Button title="neutral" onClick={() => setNeutral(neutral + 1)} />
            <Button title="bad" onClick={() => setBad(bad + 1)} />
            <Stats stats={{ good, neutral, bad }} />
        </div>
    )
}

const Title = () => <h1>give feedback</h1>

const Button = ({
    title,
    onClick,
}: {
    title: string
    onClick: React.MouseEventHandler<HTMLButtonElement>
}) => {
    return <button onClick={onClick}>{title}</button>
}

const Stats = ({ stats }: { stats: StatsType }) => {
    const all = stats.good + stats.neutral + stats.bad
    const average = (stats.good + stats.bad * -1) / all
    const positve = stats.good / all

    if (stats.good + stats.bad + stats.neutral === 0) {
        return (
            <div>
                <br />
                No feedback given
            </div>
        )
    }

    return (
        <div>
            <br />
            good {stats.good}
            <br />
            neutral {stats.neutral}
            <br />
            bad {stats.bad}
            <br />
            all {all}
            <br />
            average {average}
            <br />
            positve {positve}
            <br />
        </div>
    )
}

interface StatsType {
    good: number
    neutral: number
    bad: number
}

export default App
