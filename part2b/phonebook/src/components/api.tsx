import axios from 'axios'
import { ContactType } from '../types'

export const getContacts = async () => {
  const response = axios.get('/api/people')
  const contactsList = await response 
  return contactsList.data as unknown as ContactType[]
}

export const makeContact = async (contact: ContactType) => {
  const response = await axios.post('/api/people',contact)
  return response.data 
}

export const deleteContact = async (id: number) => {
  const response = await axios.delete('/api/people/'+id)
  return response.data
}

export const updateContact = async (id: number, data: ContactType) => {
  const response = await axios.patch('/api/people/'+id, data) 
  return response.data
}
