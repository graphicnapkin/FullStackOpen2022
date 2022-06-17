import axios from 'axios'
import { ContactType } from '../types'
const endpoint = process.env.NODE_ENV === "development" ? "http://localhost:3001" : ""

export const getContacts = async () => {
  process.env.NODE_ENkV 
  const response = axios.get(endpoint + '/api/people')
  const contactsList = await response 
  return contactsList.data as unknown as ContactType[]
}

export const makeContact = async (contact: ContactType) => {
  const response = await axios.post(endpoint + '/api/people',contact)
  return response.data 
}

export const deleteContact = async (id: number) => {
  const response = await axios.delete(endpoint + '/api/people/'+id)
  return response.data
}

export const updateContact = async (id: number, data: ContactType) => {
  const response = await axios.put(endpoint + '/api/people/'+id, data) 
  return response.data
}
