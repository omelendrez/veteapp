import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import Pet from './Pet'
import Confirm from '../Confirm'
import TableHeader from '../table/TableHeader'
import Loading from '../Loading'
import { getPets, deletePet } from '../../services/pets'

const Pets = () => {
  const [filter, setFilter] = useState('')

  const paginationDefault = {
    curPage: 1,
    totRecords: 0,
    limit: 10,
    filter,
  }

  const [pets, setPets] = useState({ rows: [] })
  const [showConfirm, setShowConfirm] = useState(false)
  const [selected, setSelected] = useState({})
  const [redirect, setRedirect] = useState('')
  const [pagination, setPagination] = useState(paginationDefault)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const updateState = () => {
      setLoading(true)
      const pag = pagination
      getPets(pagination).then((pets) => {
        pag.totRecords = pets.count
        setPagination(pag)
        setPets(pets)
        setLoading(false)
      })
    }
    updateState()
  }, [pagination])

  const changePage = (page) => {
    setPagination({ ...pagination, curPage: page })
  }

  const handleDelete = (pet) => {
    setSelected(pet)
    setShowConfirm(true)
  }

  const confirmDelete = () => {
    deletePet(selected).then(() =>
      getPets(pagination).then((pets) => {
        setPets(pets)
        setShowConfirm(false)
      })
    )
  }

  const handleEdit = (pet) => {
    setRedirect(`./edit-paciente/${pet.id}`)
  }

  const handleRestore = () => {
    setRedirect('/restaurar/pacientes')
  }

  const handleChange = (e) => {
    setFilter(e.target.value)
    if (!e.target.value) setPagination({ ...pagination, filter: '' })
  }

  const handleClick = (e) => {
    e.preventDefault()
    setPagination({ ...pagination, filter, curPage: 1 })
  }

  const { rows } = pets
  const totPages = Math.ceil(pagination.totRecords / pagination.limit)

  if (loading) return <Loading />

  return (
    <>
      {showConfirm && (
        <Confirm
          title='Desactivando paciente'
          question={`¿Desea desactivar paciente ${selected.name}?`}
          okButton='Desactivar'
          cancelButton='Cancelar'
          cancelDelete={() => setShowConfirm(false)}
          confirmDelete={() => confirmDelete()}
        />
      )}
      {redirect && <Redirect to={redirect} />}
      <div className='container'>
        <h3>Pacientes</h3>
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
              <th scope='col'>Nombre</th>
              <th scope='col'>Cliente</th>
              <th scope='col'>Tipo</th>
              <th scope='col'>Raza</th>
              <th scope='col'>Sexo</th>
              <th scope='col'>Edad</th>
              <th scope='col' colSpan='3'></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((record, index) => (
              <Pet
                key={index}
                indice={index + 1}
                data={record}
                deletePet={() => handleDelete(record)}
                editPet={() => handleEdit(record)}
              />
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default Pets
