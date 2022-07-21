import React, { useState, useEffect } from 'react'
import { login } from '../../services/users'
import { saveUser } from '../../services/utils'

const Login = () => {
  const user = {
    email: '',
    password: '',
  }
  const [form, setForm] = useState(user)
  const [error, setError] = useState('')
  const [isDisabled, setIsDisabled] = useState(true)

  const handleChange = (e) => {
    e.preventDefault()
    setForm({ ...form, [e.target.id]: e.target.value })
  }

  const handlelogin = () => {
    setError('')
    login(form)
      .then((user) => {
        saveUser(user)
      })
      .catch((err) => setError(err.response.data.error))
  }

  useEffect(() => {
    const listener = (event) => {
      if (event.code === 'Enter' || event.code === 'NumpadEnter') {
        event.preventDefault()
        document.getElementById('submit-login').click()
      }
    }
    document.addEventListener('keydown', listener)
    return () => {
      document.removeEventListener('keydown', listener)
    }
  }, [])

  useEffect(() => {
    if (form.email && form.password) {
      setIsDisabled(false)
    } else {
      setIsDisabled(true)
    }
  }, [form])

  return (
    <div className='container'>
      <div className='row'>
        <div className='col'></div>
        <div className='col-12 col-sm-8 col-md-6 col-lg-4 mt-5 p-5 card'>
          <h3>Login</h3>
          <form>
            <div className='form-group'>
              <label htmlFor='email' className='form-label'>
                Email
              </label>
              <input
                autoFocus
                className='form-control'
                type='email'
                autoComplete='new-password'
                id='email'
                onChange={handleChange}
                value={form.email}
                placeholder='Ingrese su email'
              />
            </div>
            <div className='form-group'>
              <label htmlFor='password' className='form-label'>
                Password
              </label>
              <input
                className='form-control'
                type='password'
                autoComplete='new-password'
                id='password'
                onChange={handleChange}
                value={form.password}
                placeholder='Ingrese su password'
              />
            </div>
          </form>
          <button
            type='submit'
            id='submit-login'
            className='btn btn-primary'
            onClick={handlelogin}
            disabled={isDisabled}
          >
            Login
          </button>
          {error?.length > 0 && (
            <div className='alert alert-danger mt-3' role='alert'>
              {error}
            </div>
          )}
        </div>
        <div className='col'></div>
      </div>
    </div>
  )
}

export default Login
