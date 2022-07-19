import React from 'react'
import './Checkbox.css'

const Checkbox = ({ id, label, checked, handleChange }) => {
  return (
    <div className="bg-light p-2">
      <input type="checkbox" checked={checked} id={id} onChange={handleChange} />
      <label className="checkbox" htmlFor={id}>{label}</label>
    </div>
  )
}

export default Checkbox
