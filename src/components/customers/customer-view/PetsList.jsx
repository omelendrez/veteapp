import React from 'react'
import { isReadOnly } from '../../../services/utils'

const PetsList = ({ pet, pets, loadPet, handleAddPet }) => {

  return (
    !pet.name &&
    <div className="pets mt-2">
      <div className="pets-header">
        Pacientes
      </div>
      <ul className="list-group">
        {
          pets.map((pet, index) => {
            return (
              <li
                className="list-group-item"
                key={index}
                onClick={() => loadPet(pet)}
              >
                <button className={`btn btn-${pet.statusId === 1 ? 'info' : 'danger'} btn-block`}>
                  {`${pet.name} (${pet.statusId === 1 ? 'activo' : 'inactivo'})`}
                </button>
              </li>
            )
          })
        }
      </ul>
      {
        !pets.length && <div className="alert alert-warning my-3">No tiene mascotas</div>
      }
      {!isReadOnly() &&
        <div className="text-center">
          <button
            type="button"
            className="btn btn-link btn-sm mt-4"
            onClick={e => handleAddPet(e)}
          >Agregar paciente</button>
        </div>
      }

    </div >

  )
}

export default PetsList
