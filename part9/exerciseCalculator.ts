interface Output {
    peroidLength: number
    trainingDays: number
    sucess: boolean
    rating: number
    ratingDescription: string
    target: number
    average: number
}

const calculateExercises = (target: number, actualHours: number[]): Output => {
    const averageHours =
        actualHours.reduce((a, b) => a + b) / actualHours.length
    let rating = 0
    let ratingDescription = ''
    let howClose = Math.abs(averageHours - target)
    if (howClose <= 0.5) {
        rating = 3
        ratingDescription = 'Good Job'
    } else if (howClose <= 1) {
        rating = 2
        ratingDescription = 'Could be better'
    } else {
        rating = 1
        ratingDescription = 'You are trying right?'
    }

    return {
        peroidLength: actualHours.length,
        trainingDays: actualHours.filter((h) => h > 0).length,
        sucess: averageHours >= target,
        rating,
        ratingDescription,
        target,
        average: averageHours,
    }
}

const parseTheArguments = (
    args: Array<string>
): { target: number; actualHours: number[] } => {
    if (args.length < 4) throw new Error('Not enough arguments')
    const [, , target, ...inputs] = process.argv
    const actualHours = inputs.map((n) => Number(n))

    if (!isNaN(Number(args[2])) && inputs.every((n) => !isNaN(Number(n)))) {
        return {
            target: Number(target),
            actualHours,
        }
    } else {
        throw new Error('Providedvalues were not numbers!')
    }
}

try {
    const { target, actualHours } = parseTheArguments(process.argv)
    console.log(calculateExercises(target, actualHours))
} catch (err: unknown) {
    let errorMessage = 'Something bad happened.'
    if (err instanceof Error) {
        errorMessage += 'Error: ' + err?.message
    }
    console.log(errorMessage)
}
