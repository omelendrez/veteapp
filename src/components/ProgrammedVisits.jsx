import React from 'react'
import { Link } from 'react-router-dom'
import { formatDate } from '../services/utils'

const ProgrammedVisits = ({ appointments }) => {
  return (
    <div className='container'>
      <h3>Visitas Programadas</h3>
      <table className='table table-sm table-responsive'>
        <tbody>
          {appointments.map((appointment, index) => {
            const {
              customerId,
              petId,
              customerName,
              petName,
              nextAppointment,
              type,
            } = appointment
            let redirect = {}
            switch (type) {
              case 'Consulta':
                redirect = {
                  pathname: `/clientes/${customerId}/${petId}`,
                  state: { current: 'consultas', from: '/' },
                }
                break
              case 'Vacunación':
                redirect = {
                  pathname: `/clientes/${customerId}/${petId}`,
                  state: { current: 'vacunaciones', from: '/' },
                }
                break
              case 'Desparasitación':
                redirect = {
                  pathname: `/clientes/${customerId}/${petId}`,
                  state: { current: 'desparasitaciones', from: '/' },
                }
                break
              default:
            }
            return (
              <tr key={index}>
                <td>{type}</td>
                <td>{formatDate(nextAppointment)}</td>
                <td className='name'>
                  <Link to={redirect}>{petName}</Link>
                </td>
                <td>{customerName}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default ProgrammedVisits
