import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import Consultation from './Consultation'
import Confirm from '../../Confirm'
import { getConsultationsByPet, deleteConsultation } from '../../../services/consultations'
import { getVaccinationsByPet, deleteVaccination } from '../../../services/vaccinations'
import { getDewormingsByPet, deleteDeworming } from '../../../services/dewormings'
import { formatDate } from '../../../services/utils'

const Consultations = ({ pet, current }) => {
	const [redirect, setRedirect] = useState('')
	const [selected, setSelected] = useState({})
	const [showConfirm, setShowConfirm] = useState(false)
	const [consultations, setConsultations] = useState({ rows: [], count: 0 })

	useEffect(() => {
		switch (current) {
			case 'consultas':
				getConsultationsByPet(pet.id)
					.then(consultations => {
						setConsultations(consultations)
					})
				break;
			case 'vacunaciones':
				getVaccinationsByPet(pet.id)
					.then(consultations => {
						setConsultations(consultations)
					})
				break;
			case 'desparasitaciones':
				getDewormingsByPet(pet.id)
					.then(consultations => {
						setConsultations(consultations)
					})
				break;
			default:
		}
	}, [pet.id, current])

	const handleEditConsultation = id => {
		let pathName = ''
		switch (current) {
			case 'consultas':
				pathName = `/edit-consulta/${id}`
				break;
			case 'vacunaciones':
				pathName = `/edit-vacunacion/${id}`
				break;
			case 'desparasitaciones':
				pathName = `/edit-desparasitacion/${id}`
				break;
			default:
		}

		setRedirect({
			pathname: pathName,
			state: {
				from: `/clientes/${pet.customerId}/${pet.id}`
			}
		})
	}

	const handleDeleteConsultation = consultation => {
		setSelected(consultation)
		setShowConfirm(true)
	}

	const confirmDelete = () => {
		switch (current) {
			case 'consultas':
				deleteConsultation(selected)
					.then(() => getConsultationsByPet(pet.id)
						.then(consultations => {
							setConsultations(consultations)
							setShowConfirm(false)
						}))
				break;
			case 'vacunaciones':
				deleteVaccination(selected)
					.then(() => getVaccinationsByPet(pet.id)
						.then(consultations => {
							setConsultations(consultations)
							setShowConfirm(false)
						}))
				break;
			case 'desparasitaciones':
				deleteDeworming(selected)
					.then(() => getDewormingsByPet(pet.id)
						.then(consultations => {
							setConsultations(consultations)
							setShowConfirm(false)
						}))
				break;
			default:
		}
	}

	const { count, rows } = consultations

	return (
		<>
			{redirect && <Redirect to={redirect} />}

			<div className="consultations">
				{showConfirm &&
					<Confirm
						title="Desactivando visita"
						question={`¿Desea desactivar visita del ${formatDate(selected.date)} del paciente ${pet.name}?`}
						okButton="Desactivar"
						cancelButton="Cancelar"
						cancelDelete={() => setShowConfirm(false)}
						confirmDelete={() => confirmDelete()}
					/>
				}
				{!count && current && <div className="container text-center">
					<div className="alert alert-warning">{`El paciente no registra ${current}`}</div>
				</div>
				}
				<div className="consultations-list overflow-auto">
					{rows.map((consultation, index) => <Consultation
						key={index}
						consultation={consultation}
						editConsultation={handleEditConsultation}
						deleteConsultation={handleDeleteConsultation}
					/>)}
				</div>
			</div>
		</>
	)
}

export default Consultations