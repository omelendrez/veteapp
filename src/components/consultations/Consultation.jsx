import React from 'react'
import { Link } from 'react-router-dom'
import { formatDate, getTreatmentStage, formatDateFull } from '../../services/utils'
import TableActions from '../TableActions'

const Consultation = ({ data, deleteConsultation, editConsultation }) => {

  const { date, petName, customerName, diagnosis, nextAppointment, petId, customerId, treatmentStage, updatedAt, userName } = data

  return (
    <tr>
      <td className="text-nowrap">
        {formatDate(date)}
      </td>
      <td>
        <Link to={{ pathname: `/clientes/${customerId}/${petId}`, state: { current: 'consultas' } }}>{petName}</Link>
      </td>
      <td>{customerName}</td>
      <td>{diagnosis}</td>
      <td>{getTreatmentStage(treatmentStage)}</td>
      <td className="text-nowrap">{nextAppointment ? formatDate(nextAppointment) : ''}</td>
      <td className="text-center text-capitalize small">
        <div>{userName || ''}</div>
        <div>{formatDateFull(updatedAt)}</div>
      </td>
      <TableActions
        actionDelete={deleteConsultation}
        actionEdit={editConsultation}
        data={data}
      />

    </tr>
  )
}

export default Consultation