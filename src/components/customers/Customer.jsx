import React from 'react'
import { Link } from 'react-router-dom'
import './Customer.css'
import TableActions from '../TableActions'
import { formatDateFull } from '../../services/utils'

const Customer = ({ data, deleteCustomer, editCustomer }) => {

  const { id, name, address, phone, pets, observations, updatedAt, user } = data
  const petsList = pets.map(pet => pet.name)
  const userName = user ? user.name : ''

  return (
    <tr>
      <td className="name">
        <Link to={`/clientes/${id}`}>{name}</Link>
      </td>
      <td>
        <div className="pet-list">
          {petsList.join(', ')}
        </div>
      </td>
      <td>{address}</td>
      <td>{phone}</td>
      <td>{observations}</td>
      <td className="text-center text-capitalize small">
        <div>{userName || ''}</div>
        <div>{formatDateFull(updatedAt)}</div>
      </td>
      <TableActions
        actionDelete={deleteCustomer}
        actionEdit={editCustomer}
        data={data}
      />

    </tr>
  )
}

export default Customer