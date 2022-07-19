import React from 'react'
import { Link } from 'react-router-dom'
import { formatDate, formatDateFull } from '../../services/utils'
import TableActions from '../TableActions'

const Vaccination = ({ data, deleteVaccination, editVaccination }) => {

    const { date, petName, customerName, vaccination, nextAppointment, petId, customerId, updatedAt, userName } = data

    return (
        <tr>
            <td className="text-nowrap">
                {formatDate(date)}
            </td>
            <td>
                <Link to={{ pathname: `/clientes/${customerId}/${petId}`, state: { current: 'vacunaciones' } }}>{petName}</Link>

            </td>
            <td>{customerName}</td>
            <td>{vaccination}</td>
            <td className="text-nowrap">{nextAppointment ? formatDate(nextAppointment) : ''}</td>
            <td className="text-center text-capitalize small">
                <div>{userName || ''}</div>
                <div>{formatDateFull(updatedAt)}</div>
            </td>
            <TableActions
                actionDelete={deleteVaccination}
                actionEdit={editVaccination}
                data={data}
            />
        </tr>
    )
}

export default Vaccination