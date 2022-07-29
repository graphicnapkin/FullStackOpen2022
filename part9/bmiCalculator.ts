export const calculateBmi = (height: number, weight: number) => {
    const bmi = (weight / (height * height * 0.01)) * 100
    let output = ''
    if (bmi < 18.5) output = 'Underweight'
    else if (bmi < 25) output = 'Healthy Weight'
    else output = 'Overweight'
    return output
}

const parseArguments = (
    args: Array<string>
): { height: number; weight: number } => {
    if (args.length < 4) throw new Error('Not enough arguments')
    if (args.length > 4) throw new Error('Too many arguments')

    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            height: Number(args[2]),
            weight: Number(args[3]),
        }
    } else {
        throw new Error('Providedvalues were not numbers!')
    }
}

try {
    const { height, weight } = parseArguments(process.argv)
    calculateBmi(height, weight)
} catch (err: unknown) {
    let errorMessage = 'Something bad happened.'
    if (err instanceof Error) {
        errorMessage += 'Error: ' + err?.message
    }
    console.log(errorMessage)
}
