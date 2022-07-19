import React from 'react'
import './Modal.css'

const Modal = props => {
  const { show, toggleModal, title, onSubmit, error } = props
  const style = { display: show ? 'block' : 'none' }

  return (
    <div className="local-modal" style={style}>
      <div className="local-modal-content p-4  col-lg-8">
        <div className="local-modal-header">
          <span className="close" onClick={e => toggleModal(e)}>&times;</span>
          <h5>{title}</h5>
        </div>
        <div className="local-modal-body my-5">
          {props.children}
        </div>
        <div className="local-modal-footer">
          <button className="btn btn-primary" onClick={e => onSubmit(e)}>Guardar</button>
          <button className="btn btn-danger float-right" onClick={e => toggleModal(e)}>Volver</button>
        </div>
        {error && <div className="alert alert-danger mt-3" role="alert">{error}</div>}
      </div>
    </div>
  )
}

export default Modal