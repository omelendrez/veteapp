import React, { useEffect, useState } from 'react'
import { getProgrammedVisits as con } from '../services/consultations'
import { getProgrammedVisits as vac } from '../services/vaccinations'
import { getProgrammedVisits as dew } from '../services/dewormings'
import ProgrammedVisits from '../components/ProgrammedVisits'
import Loading from './Loading'

const Appointments = () => {
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)

  const updateData = (data, type) => {
    return data.rows.map(item => {
      item = { ...item, type }
      return item
    })
  }

  useEffect(() => {
    setLoading(true)
    const updateState = async () => {
      let records = []

      let data = await con()
      records = [...records, ...updateData(data, 'Consulta')]

      data = await vac()
      records = [...records, ...updateData(data, 'Vacunación')]

      data = await dew()
      records = [...records, ...updateData(data, 'Desparasitación')]

      records.sort((a, b) => {
        if (a.nextAppointment > b.nextAppointment) return 1
        if (a.nextAppointment < b.nextAppointment) return -1
        return 0
      })

      setAppointments(records)
      setLoading(false)
    }
    updateState()

  }, [])

  if (loading) return <Loading />

  return (
    <div className="programmed-visits">
      {appointments.length > 0 && <ProgrammedVisits appointments={appointments} />}
    </div>
  )
}

export default Appointments