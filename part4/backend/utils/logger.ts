export const info = (...params: any[]) => {
  if (process.env.NODE_ENV !== 'test') console.log(params)
}

export const logError = (...params: any[]) => {
  if (process.env.NODE_ENV !== 'test') console.error(...params)
}
