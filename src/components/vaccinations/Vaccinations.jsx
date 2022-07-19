import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import Vaccination from './Vaccination'
import TableHeader from '../table/TableHeader'
import Confirm from '../Confirm'
import Loading from '../Loading'
import { getVaccinations, deleteVaccination } from '../../services/vaccinations'

const Vaccinations = () => {
  const [filter, setFilter] = useState('')
  const paginationDefault = {
    curPage: 1,
    totRecords: 0,
    limit: 10,
    filter,
  }

  const [vaccinations, setVaccinations] = useState({ rows: [] })
  const [showConfirm, setShowConfirm] = useState(false)
  const [selected, setSelected] = useState({})
  const [redirect, setRedirect] = useState('')
  const [pagination, setPagination] = useState(paginationDefault)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const updateState = () => {
      setLoading(true)
      const pag = pagination
      getVaccinations(pagination).then((vaccinations) => {
        pag.totRecords = vaccinations.count
        setPagination(pag)
        setVaccinations(vaccinations)
        setLoading(false)
      })
    }
    updateState()
  }, [pagination])

  const changePage = (page) => {
    setPagination({ ...pagination, curPage: page })
  }

  const handleDelete = (Vaccination) => {
    setSelected(Vaccination)
    setShowConfirm(true)
  }

  const confirmDelete = () => {
    deleteVaccination(selected).then(() =>
      getVaccinations(pagination).then((vaccinations) => {
        setVaccinations(vaccinations)
        setShowConfirm(false)
      })
    )
  }

  const handleEdit = (vaccination) => {
    setRedirect({
      pathname: `/edit-vacunacion/${vaccination.id}`,
      state: {
        from: '/vacunaciones',
      },
    })
  }

  const handleRestore = () => {
    setRedirect('/restaurar/vacunaciones')
  }

  const handleChange = (e) => {
    setFilter(e.target.value)
    if (!e.target.value) setPagination({ ...pagination, filter: '' })
  }

  const handleClick = (e) => {
    e.preventDefault()
    setPagination({ ...pagination, filter, curPage: 1 })
  }

  const { rows } = vaccinations
  const totPages = Math.ceil(pagination.totRecords / pagination.limit)

  if (loading) return <Loading />

  return (
    <>
      {showConfirm && (
        <Confirm
          title='Desactivando vacunación'
          question={`¿Desea desactivar la vacunación del ${selected.date} del paciente ${selected.petName}?`}
          okButton='Desactivar'
          cancelButton='Cancelar'
          cancelDelete={() => setShowConfirm(false)}
          confirmDelete={() => confirmDelete()}
        />
      )}
      {redirect && <Redirect to={redirect} />}
      <div className='container'>
        <h3>Vacunaciones</h3>
        <TableHeader
          handleChange={handleChange}
          filter={filter}
          handleClick={handleClick}
          totPages={totPages}
          pagination={pagination}
          changePage={changePage}
          handleRestore={handleRestore}
        />
        <table className='table table-sm table-responsive'>
          <thead>
            <tr>
              <th scope='col'>Fecha</th>
              <th scope='col'>Paciente</th>
              <th scope='col'>Cliente</th>
              <th scope='col'>Vacunación</th>
              <th scope='col' className='text-nowrap'>
                Próx. Turno
              </th>
              <th scope='col' colSpan='3'></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((record, index) => (
              <Vaccination
                key={index}
                indice={index + 1}
                data={record}
                deleteVaccination={() => handleDelete(record)}
                editVaccination={() => handleEdit(record)}
              />
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default Vaccinations
