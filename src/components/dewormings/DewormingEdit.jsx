import React, { useState, useEffect } from 'react'
import FormFooter from '../FormFooter'
import { getPet } from '../../services/pets'
import { Redirect } from 'react-router-dom'
import { saveDeworming, getDeworming } from '../../services/dewormings'
import FormActions from '../FormActions'
import './DewormingForm.css'

const DewormingForm = (props) => {
  const [redirect, setRedirect] = useState('')
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    id: '',
    customerId: '',
    petId: '',
    date: '',
    deworming: '',
    nextAppointment: '',
    amount: '',
  })

  const [pet, setPet] = useState({})

  useEffect(() => {
    getDeworming(props.match.params.dewormingId).then((deworming) => {
      setForm(deworming)
      getPet(deworming.petId).then((pet) => setPet(pet))
    })
  }, [props.match.params.dewormingId])

  const handleChange = (e) => {
    e.preventDefault()
    error && setError(false)
    let { id, value } = e.target
    setForm({
      ...form,
      [id]: value,
    })
  }

  const handleSave = (e) => {
    e.preventDefault()
    saveDeworming(form)
      .then(() => goBack())
      .catch((err) => {
        setError(err.response.data.error)
      })
  }

  const goBack = () => {
    const { state } = props.location
    setRedirect({
      pathname: `${state.from}`,
      state: { current: 'desparasitaciones' },
    })
  }

  return (
    <>
      {redirect && <Redirect to={redirect} />}
      <div className='container'>
        <div className='row'>
          <div className='container'>
            <h5 className='my-3'>Editando Desparasitación de {pet.name}</h5>
            <form>
              <div className='form-container card p-3 mb-3'>
                <div className='form-group row'>
                  <label
                    htmlFor='deworming'
                    className='col-sm-2 col-form-label'
                  >
                    Desparasitación
                  </label>
                  <div className='col-sm-10'>
                    <textarea
                      className='form-control'
                      id='deworming'
                      onChange={(e) => handleChange(e)}
                      value={form.deworming}
                      rows='2'
                    />
                  </div>
                </div>
              </div>
              <FormFooter form={form} handleChange={handleChange} />

              <FormActions
                doSave={(e) => handleSave(e)}
                cancelSave={() => goBack()}
                error={error}
              />
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default DewormingForm
