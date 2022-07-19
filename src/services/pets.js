import http from './api'
import { getUser } from '../services/utils'

export const getPets = async pagination => {
	const { filter, limit, curPage } = pagination
	const response = await http.get(`pets?filter=${filter}&page=${curPage}&limit=${limit}`)
	return response.data.pets
}

export const getInactivePets = async pagination => {
	const { filter, limit, curPage } = pagination
	const response = await http.get(`pets/inactive?filter=${filter}&page=${curPage}&limit=${limit}`)
	return response.data.pets
}

export const getPet = async id => {
	const response = await http.get(`pets/${id}`)
	return response.data.pet
}

export const savePet = pet => {
	pet.userId = getUser().id
	return new Promise((resolve, reject) => {
		http.post('pets', pet)
			.then(response => {
				resolve(response.data)
			})
			.catch(error => reject(error))
	})
}

export const deletePet = pet => {
	return new Promise((resolve, reject) => {
		const { id } = pet
		http.put(`pets/${id}`)
			.then(response => {
				resolve(response.data)
			})
			.catch(error => reject(error))
	})
}

export const restorePet = pet => {
	return new Promise((resolve, reject) => {
		const { id } = pet
		http.put(`pets/${id}/restore`)
			.then(response => {
				resolve(response.data)
			})
			.catch(error => reject(error))
	})
}

export const destroyPet = pet => {
	return new Promise((resolve, reject) => {
		const { id } = pet
		http.delete(`pets/${id}`)
			.then(response => {
				resolve(response.data)
			})
			.catch(error => reject(error))
	})
}