import React, { useState, useEffect } from 'react'
import FormFooter from '../FormFooter'
import FormActions from '../FormActions'
import Checkbox from '../Checkbox'
import { getPet } from '../../services/pets'
import { Redirect } from 'react-router-dom'
import { saveVaccination, getVaccination } from '../../services/vaccinations'
import { vaccinesList } from '../../services/utils'
import './VaccinationForm.css'

const VaccinationEdit = (props) => {
  const [redirect, setRedirect] = useState('')
  const [error, setError] = useState('')
  const [pet, setPet] = useState({})
  const vaccinesState = vaccinesList.map((vaccine) => {
    vaccine.checked = false
    return vaccine
  })
  const [form, setForm] = useState({
    id: '',
    customerId: '',
    petId: '',
    date: '',
    nextAppointment: '',
    amount: '',
    vaccinesState,
  })

  useEffect(() => {
    getVaccination(props.match.params.vaccinationId).then((vaccination) => {
      const vaccinesUsed = vaccination.vaccination.split(', ')
      const newVaccinesState = vaccinesState.map((vaccine) => {
        if (vaccinesUsed.find((name) => name === vaccine.name)) {
          vaccine = { ...vaccine, checked: true }
        }
        return vaccine
      })
      setForm({ ...vaccination, vaccinesState: newVaccinesState })
      getPet(vaccination.petId).then((pet) => setPet(pet))
    })
    // eslint-disable-next-line
  }, [props.match.params.vaccinationId])

  const handleChange = (e) => {
    e.preventDefault()
    error && setError(false)
    let { id, value } = e.target
    setForm({
      ...form,
      [id]: value,
    })
  }

  const handleCheckbox = (e) => {
    error && setError(false)
    const { id } = e.target
    const { vaccinesState } = form
    const newState = vaccinesState.map((vaccine) => {
      if (vaccine.id === parseInt(id)) {
        const { checked } = vaccine
        vaccine = { ...vaccine, checked: !checked }
      }
      return vaccine
    })
    setForm({
      ...form,
      vaccinesState: newState,
    })
  }

  const handleSave = (e) => {
    e.preventDefault()
    const vaccines = form.vaccinesState
      .filter((vaccine) => vaccine.checked)
      .map((vaccine) => vaccine.name)
    if (!vaccines.length) {
      return setError('Debe seleccionar por lo menos una vacuna')
    }
    form.vaccination = vaccines.join(', ')
    saveVaccination(form)
      .then(() => goBack())
      .catch((err) => {
        setError(err.response.data.error)
      })
  }

  const goBack = () => {
    const { state } = props.location
    setRedirect({
      pathname: `${state.from}`,
      state: { current: 'vacunaciones' },
    })
  }

  return (
    <>
      {redirect && <Redirect to={redirect} />}
      <div className='container'>
        <div className='row'>
          <div className='container'>
            <h5 className='my-3'>Editando Vacunación de {pet.name}</h5>
            <form>
              <div className='form-container card p-3 mb-3'>
                <div className='form-group row'>
                  <label
                    htmlFor='vaccination'
                    className='col-sm-2 col-form-label'
                  >
                    Vacunas
                  </label>
                  <div className='col-sm-10'>
                    {vaccinesList.map((vaccine) => (
                      <Checkbox
                        key={vaccine.id}
                        id={vaccine.id}
                        label={vaccine.name}
                        handleChange={handleCheckbox}
                        checked={
                          form.vaccinesState.find((v) => v.id === vaccine.id)
                            .checked
                        }
                      />
                    ))}
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

export default VaccinationEdit
