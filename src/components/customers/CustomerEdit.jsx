import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { saveCustomer, getCustomer } from '../../services/customers'
import FormActions from '../FormActions'

const CustomerForm = props => {
  const [back, setBack] = useState(false)
  const [error, setError] = useState('')

  const formDefault = {
    name: '',
    address: '',
    phone: '',
    email: '',
    observations: ''
  }

  const [form, setForm] = useState(formDefault)

  useEffect(() => {
    getCustomer(props.match.params.id)
      .then(customer => setForm(customer))
  }, [props.match.params.id])

  const handleChange = (e => {
    e.preventDefault()
    error && setError(false)
    setForm({
      ...form,
      [e.target.id]: e.target.value
    })
  })

  const handleSave = (e => {
    e.preventDefault()
    saveCustomer(form)
      .then(() => setBack(true))
      .catch(err => {
        setError(err.response.data.error)
      })
  })

  return (
    <>
      {back && <Redirect to="/clientes" />}
      <div className="container">
        <div className="row">
          <div className="container col-lg-8">
            <h1 className="my-3">Editando Cliente</h1>
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
                cancelSave={() => setBack('/clientes')}
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
