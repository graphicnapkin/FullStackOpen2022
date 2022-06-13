import axios from 'axios'
import { ContactType } from '../types'

export const getContacts = async () => {
  const response = axios.get('http://localhost:3001/persons')
  const contactsList = await response 
  return contactsList.data as unknown as ContactType[]
}

export const makeContact = async (contact: ContactType) => {
  const response = await axios.post('http://localhost:3001/persons',contact)
  return response.data 
}

export const deleteContact = async (id: number) => {
  const response = await axios.delete('http://localhost:3001/persons/'+id)
  return response.data
}

export const updateContact = async (id: number, data: ContactType) => {
  const response = await axios.patch('http://localhost:3001/persons/'+id, data) 
  return response.data
}
