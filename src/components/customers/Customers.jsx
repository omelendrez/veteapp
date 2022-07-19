import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import Customer from './Customer'
import Confirm from '../Confirm'
import TableHeader from '../table/TableHeader'
import Loading from '../Loading'
import { getCustomers, deleteCustomer } from '../../services/customers'
import { isReadOnly } from '../../services/utils'

const Customers = () => {
  const [filter, setFilter] = useState('')
  const paginationDefault = {
    curPage: 1,
    totRecords: 0,
    limit: 10,
    filter,
  }

  const [customers, setCustomers] = useState({ rows: [] })
  const [showConfirm, setShowConfirm] = useState(false)
  const [selected, setSelected] = useState({})
  const [redirect, setRedirect] = useState('')
  const [pagination, setPagination] = useState(paginationDefault)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const updateState = () => {
      setLoading(true)
      const pag = pagination
      getCustomers(pagination).then((customers) => {
        pag.totRecords = customers.count
        setPagination(pag)
        setCustomers(customers)
        setLoading(false)
      })
    }
    updateState()
  }, [pagination])

  const changePage = (page) => {
    setPagination({ ...pagination, curPage: page })
  }

  const confirmDelete = () => {
    deleteCustomer(selected).then(() =>
      getCustomers(pagination).then((customers) => {
        setCustomers(customers)
        setShowConfirm(false)
      })
    )
  }

  const handleDelete = (customer) => {
    setSelected(customer)
    setShowConfirm(true)
  }

  const handleEdit = (customer) => {
    setRedirect(`/edit-cliente/${customer.id}`)
  }

  const handleAdd = () => {
    setRedirect('/nuevo-cliente')
  }

  const handleRestore = () => {
    setRedirect('/restaurar/clientes')
  }

  const handleChange = (e) => {
    setFilter(e.target.value)
    if (!e.target.value) setPagination({ ...pagination, filter: '' })
  }

  const handleClick = (e) => {
    e.preventDefault()
    setPagination({ ...pagination, filter, curPage: 1 })
  }

  const { rows } = customers
  const totPages = Math.ceil(pagination.totRecords / pagination.limit)

  if (loading) return <Loading />

  return (
    <>
      {redirect && <Redirect to={redirect} />}
      {showConfirm && (
        <Confirm
          title='Desactivando cliente'
          question={`¿Desea desactivar cliente ${selected.name}?`}
          okButton='Desactivar'
          cancelButton='Cancelar'
          cancelDelete={() => setShowConfirm(false)}
          confirmDelete={() => confirmDelete()}
        />
      )}
      <div className='container'>
        <h3>Clientes</h3>
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
              <th scope='col'>Paciente</th>
              <th scope='col'>Domicilio</th>
              <th scope='col'>Teléfono</th>
              <th scope='col'>Observaciones</th>
              <th scope='col' colSpan='3'>
                {!isReadOnly() && (
                  <button
                    className='btn btn-primary my-1 float-right text-nowrap btn-sm'
                    onClick={() => handleAdd()}
                  >
                    Agregar Cliente
                  </button>
                )}
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((record, index) => (
              <Customer
                key={index}
                indice={index + 1}
                data={record}
                deleteCustomer={() => handleDelete(record)}
                editCustomer={() => handleEdit(record)}
              />
            ))}
          </tbody>
          {!rows.length && (
            <tfoot>
              <tr>
                <td colSpan={8} className='text-center text-capitalize small'>
                  No hay datos para mostrar
                </td>
              </tr>
            </tfoot>
          )}
        </table>
      </div>
    </>
  )
}

export default Customers
