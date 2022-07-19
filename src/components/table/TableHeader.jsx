import React from 'react'
import Pagination from '../Pagination'
import { isReadOnly } from '../../services/utils'
import './TableHeader.css'

export default function TableHeader({
  handleChange,
  filter,
  handleClick,
  pagination,
  changePage,
  handleRestore,
}) {
  const smallDevice = window.innerWidth < 768
  return (
    <div className='table-header'>
      <div>
        <input
          className='form-control btn-sm'
          type='search'
          aria-label='Search'
          onChange={(e) => handleChange(e)}
          value={filter}
        />
      </div>
      <div>
        <button className='btn btn-warning' onClick={(e) => handleClick(e)}>
          Buscar
        </button>
      </div>
      {!smallDevice && (
        <div>
          <Pagination pagination={pagination} changePage={changePage} />
        </div>
      )}

      {!isReadOnly() && handleRestore && (
        <div>
          <button
            className='btn btn-outline-secondary btn-sm'
            onClick={() => handleRestore()}
          >
            Restaurar
          </button>
        </div>
      )}
    </div>
  )
}
