import React, { useEffect, useState } from 'react'
import TableHeader from '../table/TableHeader'
import Loading from '../Loading'
import Modal from '../Modal'
import { getDebtors } from '../../services/customers'
import { savePayment } from '../../services/accounts'
import { Link } from 'react-router-dom'
import { paymentMethods, setToday } from '../../services/utils'

const Debtors = () => {
  const [filter, setFilter] = useState('')
  const paginationDefault = {
    curPage: 1,
    totRecords: 0,
    limit: 10,
    filter,
  }

  const [debtors, setDebtors] = useState({ rows: [] })
  const [pagination, setPagination] = useState(paginationDefault)
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [debtor, setDebtor] = useState({})
  const [form, setForm] = useState({ credit: 0, date: '' })
  const [error, setError] = useState('')

  useEffect(() => {
    const updateState = () => {
      setLoading(true)
      const pag = pagination
      getDebtors(pagination).then((debtors) => {
        pag.totRecords = debtors.count.length
        setPagination(pag)
        setDebtors(debtors)
        setLoading(false)
      })
    }
    updateState()
  }, [pagination])

  const handleChange = (e) => {
    setFilter(e.target.value)
    if (!e.target.value) setPagination({ ...pagination, filter: '' })
  }

  const handleClick = (e) => {
    e.preventDefault()
    setPagination({ ...pagination, filter, curPage: 1 })
  }

  const changePage = (page) => {
    setPagination({ ...pagination, curPage: page })
  }

  const registerPayment = (e, debtor) => {
    e.preventDefault()
    setDebtor(debtor)
    setForm({
      customerId: debtor.id,
      balance: debtor.balance,
      credit: 0,
      paymentMethod: 0,
      date: setToday(),
    })
    setShowModal(!showModal)
  }

  const toggleModal = (e) => {
    e.preventDefault()
    setError('')
    setShowModal(!showModal)
  }

  const handleChangeForm = (e) => {
    e.preventDefault()
    setError('')
    let { id, value } = e.target
    setForm({
      ...form,
      [id]: value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (form.credit < 1) {
      setError('Importe pagado no puede ser 0')
      return
    }
    if (form.paymentMethod === 0) {
      setError('Debe elegir un método de pago')
      return
    }

    if (form.credit > form.balance) {
      setError('El importe pagado no debe ser mayor que el importe a pagar')
      return
    }

    savePayment(form).then(() => {
      setLoading(true)
      const pag = pagination
      getDebtors(pagination).then((debtors) => {
        pag.totRecords = debtors.count.length
        setPagination(pag)
        setDebtors(debtors)
        setLoading(false)
      })
    })

    setShowModal(!showModal)
  }

  const totPages = Math.ceil(pagination.totRecords / pagination.limit)
  const { rows } = debtors

  return (
    <>
      {loading && <Loading />}
      {!loading && (
        <div className='container'>
          <h3>Deudores</h3>
          <TableHeader
            handleChange={handleChange}
            filter={filter}
            handleClick={handleClick}
            totPages={totPages}
            pagination={pagination}
            changePage={changePage}
          />
          <table className='table table-sm table-responsive'>
            <thead>
              <tr>
                <th scope='col'>Nombre</th>
                <th scope='col'>Paciente</th>
                <th scope='col'>Domicilio</th>
                <th scope='col'>Teléfono</th>
                <th scope='col' className='text-right'>
                  Deuda
                </th>
                <th scope='col' style={{ minWidth: '120px' }} colSpan='2'></th>
              </tr>
            </thead>
            <tbody>
              {rows.map((debtor) => (
                <tr key={debtor.id}>
                  <td className='name'>
                    <Link
                      to={{
                        pathname: `/clientes/${debtor.id}`,
                        state: { from: '/deudores' },
                      }}
                    >
                      {debtor.name}
                    </Link>
                  </td>
                  <td>{debtor.pets.map((pet) => pet.name).join(', ')}</td>
                  <td>{debtor.address}</td>
                  <td>{debtor.phone}</td>
                  <td className='text-right'>$ {debtor.balance.toFixed(2)}</td>
                  <td className='text-right'>
                    <button
                      className='btn btn-success'
                      onClick={(e) => registerPayment(e, debtor)}
                    >
                      Registrar pago
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <Modal
        show={showModal}
        toggleModal={toggleModal}
        title={`Registro de pago de ${debtor.name}`}
        onSubmit={handleSubmit}
        error={error}
      >
        <div className='col-12 col-sm'>
          <div className='form-group row'>
            <label htmlFor='amount' className='col-sm-5 col-form-label'>
              Total adeudado
            </label>
            <div className='col-sm-7'>
              <input
                type='number'
                className='form-control text-right'
                readOnly={true}
                id='amount'
                onChange={(e) => handleChangeForm(e)}
                value={parseFloat(form.balance).toFixed(2)}
              />
            </div>
          </div>
        </div>
        <div className='col-12 col-sm'>
          <div className='form-group row'>
            <label htmlFor='credit' className='col-sm-5 col-form-label'>
              Importe a pagar
            </label>
            <div className='col-sm-7'>
              <input
                type='number'
                className='form-control text-right'
                id='credit'
                onChange={(e) => handleChangeForm(e)}
                value={parseFloat(form.credit)}
              />
            </div>
          </div>
        </div>
        <div className='col-12 col-sm'>
          <div className='form-group row'>
            <label htmlFor='paymentMethod' className='col-sm-5 col-form-label'>
              Forma de pago
            </label>
            <div className='col-sm-7'>
              <select
                className='form-control'
                id='paymentMethod'
                onChange={(e) => handleChangeForm(e)}
                value={form.paymentMethod}
              >
                {paymentMethods.map((method) => (
                  <option key={method.id} value={method.id}>
                    {' '}
                    {method.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className='col-12 col-sm'>
          <div className='form-group row'>
            <label htmlFor='date' className='col-sm-5 col-form-label'>
              Fecha de pago
            </label>
            <div className='col-sm-7'>
              <input
                type='date'
                className='form-control'
                id='date'
                onChange={(e) => handleChangeForm(e)}
                value={form.date}
              />
            </div>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default Debtors
