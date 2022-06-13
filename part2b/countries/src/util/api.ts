import Axios from 'axios'

const getCountries = async () => {
  const countries = await Axios.get("https://restcountries.com/v3.1/all")
  return countries.data 
}

export default getCountries
