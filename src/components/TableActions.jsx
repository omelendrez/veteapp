import React from 'react'
import { isReadOnly } from '../services/utils'

const TableActions = ({ data, actionDelete, actionEdit }) => {
  if (isReadOnly()) return null
  return (
    <>
      <td style={{ width: '120px' }}>
        <button
          className="btn btn-danger"
          onClick={() => actionDelete(data)}
        >Desactivar</button>
      </td>
      <td style={{ width: '120px' }}>
        <button
          className="btn btn-info"
          onClick={() => actionEdit(data)}
        >Modificar</button>
      </td>
    </>
  )
}

export default TableActions
