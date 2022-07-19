import React from 'react'
import PetsList from './PetsList'
import Pet from './Pet'
import { isReadOnly } from '../../../services/utils'
import './Customer.css'

const Customer = ({ customer, pet, handleAddPet, loadPet, setBack, debt }) => {
  const { name, address, phone, email, observations, pets, statusId } = customer

  return (
    <>
      <div className="text-center d-none d-md-block">
        <div className="card customer">
          <div className="card-body">
            <h5 className="card-title">{name}</h5>
            <h6 className="card-subtitle mb-2 text-muted">{address}</h6>
            <h6 className="card-subtitle mb-2 text-muted">{phone}</h6>
            <h6 className="card-subtitle mb-2 text-muted">{email}</h6>
            {observations && <p className="card-text observations">{observations}</p>}
            {!isReadOnly() && debt.balance > 0 && <p className="card-text text-danger">Debe ${debt.balance}</p>}
            <p className={`status ${statusId === 1 ? 'active' : 'inactive'}`}>{statusId === 1 ? 'Activo' : 'Inactivo'}</p>
          </div>
        </div>
        {pet.name &&
          <>
            <Pet pet={pet} />
          </>
        }

        <div className="container mt-3 button-container">
          <button
            type="button"
            className="btn btn-warning btn-block"
            onClick={() => setBack(true)}
          >Volver</button>
        </div>
      </div>
      <PetsList pet={pet} pets={pets} loadPet={loadPet} handleAddPet={handleAddPet} />
    </>
  )
}

export default Customer
