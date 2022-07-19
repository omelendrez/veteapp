import http from './api'
import { getUser } from '../services/utils'

export const getConsultations = async pagination => {
  const { filter, limit, curPage } = pagination
  const response = await http.get(`consultations?filter=${filter}&page=${curPage}&limit=${limit}`)
  return response.data.consultations
}

export const getInactiveConsultations = async pagination => {
  const { filter, limit, curPage } = pagination
  const response = await http.get(`consultations/inactive?filter=${filter}&page=${curPage}&limit=${limit}`)
  return response.data.consultations
}

export const getProgrammedVisits = async () => {
  const response = await http.get(`consultations/programmed-visits`)
  return response.data.consultations
}

export const getConsultationsByPet = async id => {
  const response = await http.get(`consultations/by-pet/${id}`)
  return response.data.consultations
}

export const saveConsultation = consultation => {
  consultation.userId = getUser().id
  return new Promise((resolve, reject) => {
    http.post('consultations', consultation)
      .then(response => {
        resolve(response.data)
      })
      .catch(error => reject(error))
  })
}

export const getConsultation = async id => {
  const response = await http.get(`consultations/${id}`)
  return response.data.consultation
}

export const deleteConsultation = consultation => {
  return new Promise((resolve, reject) => {
    const { id } = consultation
    http.put(`consultations/${id}`)
      .then(response => {
        resolve(response.data)
      })
      .catch(error => reject(error))
  })
}

export const restoreConsultation = consultation => {
  return new Promise((resolve, reject) => {
    const { id } = consultation
    http.put(`consultations/${id}/restore`)
      .then(response => {
        resolve(response.data)
      })
      .catch(error => reject(error))
  })
}

export const destroyConsultation = consultation => {
  return new Promise((resolve, reject) => {
    const { id } = consultation
    http.delete(`consultations/${id}`)
      .then(response => {
        resolve(response.data)
      })
      .catch(error => reject(error))
  })
}