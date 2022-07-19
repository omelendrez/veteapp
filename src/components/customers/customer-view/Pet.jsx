import React from 'react'
import { getSexName, getAge } from '../../../services/utils'
import './Pet.css'

const Pet = ({ pet }) => {
  const { name, type, breed, sex, weight, birthDate, observations, statusId } = pet
  return (
    <div className="card pet">
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <h6 className="card-subtitle mb-2 text-muted">{type}</h6>
        <h6 className="card-subtitle mb-2 text-muted">{breed}</h6>
        <h6 className="card-subtitle mb-2 text-muted">{getSexName(sex)}</h6>
        <h6 className="card-subtitle mb-2 text-muted">{weight}</h6>
        <h6 className="card-subtitle mb-2 text-muted">{getAge(birthDate)}</h6>
        <p className="card-text observations">{observations}</p>
        <p className={`status ${statusId === 1 ? 'active' : 'inactive'}`}>{statusId === 1 ? 'Activo' : 'Inactivo'}</p>
      </div>
    </div>
  )
}

export default Pet