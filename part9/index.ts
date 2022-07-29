import express from 'express'
const app = express()

import { calculateBmi } from './bmiCalculator'

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!')
})

app.get('/bmi', (req, res) => {
    const { height, weight } = req.query
    if (isNaN(Number(height)) || isNaN(Number(weight))) {
        res.status(400).send({ error: 'malformed parameters' })
        return
    }
    res.send({
        height,
        weight,
        bmi: calculateBmi(Number(height), Number(weight)),
    })
})

const PORT = 3003

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
