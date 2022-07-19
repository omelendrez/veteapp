import React from 'react'

const FormActions = ({ doSave, cancelSave, error }) => {
  return (
    <>
      <button
        type="submit"
        className="btn btn-primary"
        onClick={doSave}
      >Guardar</button>

      <button
        type="button"
        className="btn btn-danger float-right"
        onClick={cancelSave}
      >Volver</button>

      {error && <div className="alert alert-danger mt-3" role="alert">{error}</div>}

    </>
  )
}

export default FormActions
