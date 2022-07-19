import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { saveCustomer } from '../../services/customers'
import FormActions from '../FormActions'

const CustomerForm = () => {
  const [redirect, setRedirect] = useState('')
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    name: '',
    address: '',
    phone: '',
    email: '',
    observations: ''
  })

  const handleChange = (e => {
    e.preventDefault()
    error && setError(false)
    setForm({
      ...form,
      [e.target.id]: e.target.value
    })
  })

  const handleSave = (e => {
    saveCustomer(form)
      .then(resp => {
        setRedirect(`/clientes/${resp.record.id}`)
      })
      .catch(err => {
        setError(err.response.data.error)
      })
  })

  return (
    <>
      {redirect && <Redirect to={redirect} />}
      <div className="container">
        <div className="row">
          <div className="container col-lg-8">
            <h1 className="my-3">Nuevo Cliente</h1>
            <form>
              <div className="form-row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="name">Nombre y apellido</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      onChange={e => handleChange(e)}
                      value={form.name}
                      required
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="address">Domicilio</label>
                    <input
                      type="text"
                      className="form-control"
                      id="address"
                      onChange={e => handleChange(e)}
                      value={form.address}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="form-row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="phone">Teléfono</label>
                    <input
                      type="text"
                      className="form-control"
                      id="phone"
                      onChange={e => handleChange(e)}
                      value={form.phone}
                      required
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="text"
                      className="form-control"
                      id="email"
                      onChange={e => handleChange(e)}
                      value={form.email}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="observations">Observaciones</label>
                <textarea
                  className="form-control"
                  id="observations"
                  onChange={e => handleChange(e)}
                  value={form.observations}
                />
              </div>

              <FormActions
                doSave={e => handleSave(e)}
                cancelSave={() => setRedirect('/clientes')}
                error={error}
              />

            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default CustomerForm
