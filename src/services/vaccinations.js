import http from './api'
import { getUser } from '../services/utils'

export const getVaccinations = async pagination => {
	const { filter, limit, curPage } = pagination
	const response = await http.get(`vaccinations?filter=${filter}&page=${curPage}&limit=${limit}`)
	return response.data.vaccinations
}

export const getInactiveVaccinations = async pagination => {
	const { filter, limit, curPage } = pagination
	const response = await http.get(`vaccinations/inactive?filter=${filter}&page=${curPage}&limit=${limit}`)
	return response.data.vaccinations
}

export const getProgrammedVisits = async () => {
	const response = await http.get(`vaccinations/programmed-visits`)
	return response.data.vaccinations
}

export const getVaccinationsByPet = async id => {
	const response = await http.get(`vaccinations/by-pet/${id}`)
	return response.data.vaccinations
}

export const saveVaccination = vaccination => {
	vaccination.userId = getUser().id
	return new Promise((resolve, reject) => {
		http.post('vaccinations', vaccination)
			.then(response => {
				resolve(response.data)
			})
			.catch(error => reject(error))
	})
}

export const getVaccination = async id => {
	const response = await http.get(`vaccinations/${id}`)
	return response.data.vaccination
}

export const deleteVaccination = vaccination => {
	return new Promise((resolve, reject) => {
		const { id } = vaccination
		http.put(`vaccinations/${id}`)
			.then(response => {
				resolve(response.data)
			})
			.catch(error => reject(error))
	})
}

export const restoreVaccination = vaccination => {
	return new Promise((resolve, reject) => {
		const { id } = vaccination
		http.put(`vaccinations/${id}/restore`)
			.then(response => {
				resolve(response.data)
			})
			.catch(error => reject(error))
	})
}

export const destroyVaccination = vaccination => {
	return new Promise((resolve, reject) => {
		const { id } = vaccination
		http.delete(`vaccinations/${id}`)
			.then(response => {
				resolve(response.data)
			})
			.catch(error => reject(error))
	})
}