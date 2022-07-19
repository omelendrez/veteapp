import React, { useState, useEffect } from 'react'
import Pagination from './Pagination'
import Loading from './Loading'
import { fieldsDefault } from '../services/utils'

const Restore = props => {
  const paginationDefault = {
    curPage: 1,
    totRecords: 0,
    limit: 5,
    filter: ''
  }

  const [records, setRecords] = useState({})
  const [error, setError] = useState('')
  const [update, setUpdate] = useState(false)
  const [pagination, setPagination] = useState(paginationDefault)
  const [loading, setLoading] = useState(true)

  const table = props.match.params.table

  const fields = fieldsDefault[table].fields
  const getRecords = fieldsDefault[table].getRecords
  const restoreRecord = fieldsDefault[table].restoreRecord
  const deleteRecord = fieldsDefault[table].deleteRecord

  const handleRestore = record => {
    restoreRecord(record)
      .then(() => setUpdate(!update))
  }

  const handleDelete = record => {
    deleteRecord(record)
      .then(() => setUpdate(!update))
  }

  const changePage = page => {
    setPagination({ ...pagination, curPage: page })
    setUpdate(!update)
  }

  useEffect(() => {
    const updateState = () => {
      setLoading(true)
      const pag = pagination
      getRecords(pagination)
        .then(records => {
          pag.totRecords = records.count
          setPagination(pag)
          setRecords(records)
          if (!records.count) {
            setError('No hay registros para recuperar')
          }
          setLoading(false)
        })
    }
    updateState()
  }, [update, pagination, getRecords])

  const { rows } = records
  const totPages = Math.ceil(pagination.totRecords / pagination.limit)

  if (loading) return <Loading />

  return (
    <div className="restore">
      {rows && <table className="table table-responsive">
        <thead>
          <tr>
            {fields.map((field, index) => <th scope="col" key={index}>{field.title}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map((record, index) => (
            <tr key={index}>
              {fields.map((field, index) => <td key={index} className={field.className || null} >{record[field.name]}</td>)}
              <td>
                <button
                  className="btn btn-success"
                  onClick={() => handleRestore(record)}
                >Restaurar</button>
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(record)}
                >Eliminar</button>
              </td>
            </tr>
          ))
          }
        </tbody>
      </table>
      }
      {error && <div className="alert alert-warning container text-center">
        {error}
      </div>
      }
      {totPages > 1 && <Pagination pagination={pagination} changePage={changePage} />}
    </div >
  )
}

export default Restore