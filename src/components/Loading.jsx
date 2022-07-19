import React from 'react'
import img from '../loading.gif'
import './Loading.css'

const Loading = () => {
  return (
    <div className="loading">
      <div className="d-flex justify-content-center">
        <img src={img} alt='loading...' />
      </div>
      <p className="text-center">
        Cargando...
      </p>
    </div>
  )
}

export default Loading