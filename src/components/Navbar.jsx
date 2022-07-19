import React, { useEffect, useState } from 'react'
import NavLink from './NavLink'
import { logout, getUser, isReadOnly, isAdmin } from '../services/utils'

const Navbar = () => {
  const [user, setUser] = useState({})
  const [isSmallDevice, setIsSmallDevice] = useState(false)

  useEffect(() => {
    setUser(getUser())
    window.onresize = windowResize
  }, [])

  const handleLogout = (e) => {
    e.preventDefault()
    logout()
  }
  const windowResize = () => setIsSmallDevice(window.innerWidth < 768)

  return (
    <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
      <button
        className='navbar-toggler collapsed'
        type='button'
        data-toggle={isSmallDevice ? 'collapse' : undefined}
        data-target='#navbarSupportedContent'
        aria-controls='navbarSupportedContent'
        aria-expanded='false'
        aria-label='Toggle navigation'
      >
        <span className='navbar-toggler-icon'></span>
      </button>
      <div className='collapse navbar-collapse' id='navbarSupportedContent'>
        <ul
          className='navbar-nav mr-auto'
          data-toggle={isSmallDevice ? 'collapse' : undefined}
          data-target='#navbarSupportedContent'
        >
          <NavLink to='/'>Home</NavLink>
          <div className='dropdown-divider'></div>
          <NavLink to='/turnos'>Turnos</NavLink>
          <NavLink to='/clientes'>Clientes</NavLink>
          <NavLink to='/pacientes'>Pacientes</NavLink>
          <NavLink to='/consultas'>Consultas</NavLink>
          <NavLink to='/vacunaciones'>Vacunaciones</NavLink>
          <NavLink to='/desparasitaciones'>Desparasitaciones</NavLink>
          {!isReadOnly() && <NavLink to='/deudores'>Deudores</NavLink>}
          {isAdmin() && <NavLink to='/users'>Users</NavLink>}
        </ul>
        <div className='text-white mr-2 text-capitalize'>{user.name}</div>
        <button
          className='btn btn-warning btn-sm'
          onClick={(e) => handleLogout(e)}
        >
          Logout
        </button>
      </div>
    </nav>
  )
}

export default Navbar
