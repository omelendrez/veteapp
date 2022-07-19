import React, { useState, useEffect } from "react"
import { Redirect } from "react-router-dom"
import Customer from "./customer-view/Customer"
import Consultations from "./customer-view/Consultations"
import { getCustomer, getDebt } from "../../services/customers"
import { getPet } from "../../services/pets"
import { isReadOnly } from "../../services/utils"
import "./CustomerView.css"

const TabItem = ({ option, title, current, setCurrent }) => {
  return (
    <li className="nav-item">
      <a
        href="/"
        className={`nav-link ${option === current ? "active" : ""}`}
        onClick={(e) => {
          e.preventDefault()
          setCurrent(option)
        }}
      >
        {title}
      </a>
    </li>
  )
}

const CustomerView = (props) => {
  const [redirect, setRedirect] = useState("")
  const [customer, setCustomer] = useState({ pets: [] })
  const [pet, setPet] = useState({})
  const [debt, setDebt] = useState({})
  const { state } = props.location
  const [current, setCurrent] = useState("consultas")

  const setBack = () => {
    if (state) return setRedirect(state.from)
    setPet({})
    if (!props.match.params.petId) {
      setRedirect(`/clientes`)
    } else {
      setRedirect(`/clientes/${customer.id}`)
    }
  }

  const loadPet = (pet) => {
    setRedirect(`/clientes/${customer.id}/${pet.id}`)
  }

  useEffect(() => {
    if (props.location.state && props.location.state.current) {
      setCurrent(props.location.state.current)
    } else {
      setCurrent("consultas")
    }

    getCustomer(props.match.params.id).then((customer) => {
      setCustomer(customer)
      const pet = { id: props.match.params.petId }
      if (props.match.params.petId) {
        selectPet(pet)
      }
    })
  }, [props])

  useEffect(() => {
    getDebt(props.match.params.id).then((debt) => setDebt(debt))
  }, [props.match.params.id])

  const handleAddConsultation = (e) => {
    setRedirect({
      pathname: `/nueva-consulta/${customer.id}/${pet.id}`,
      state: {
        from: `/clientes/${customer.id}/${pet.id}`,
      },
    })
  }

  const handleAddVaccination = (e) => {
    setRedirect({
      pathname: `/nueva-vacunacion/${customer.id}/${pet.id}`,
      state: {
        from: `/clientes/${customer.id}/${pet.id}`,
      },
    })
  }

  const handleAddDeworming = (e) => {
    setRedirect({
      pathname: `/nueva-desparasitacion/${customer.id}/${pet.id}`,
      state: {
        from: `/clientes/${customer.id}/${pet.id}`,
      },
    })
  }

  const handleAddPet = (e) => {
    e.preventDefault()
    setRedirect(`/nuevo-paciente/${customer.id}`)
  }

  const selectPet = (pet) => {
    getPet(pet.id).then((pet) => setPet(pet))
  }

  return (
    <>
      {redirect && <Redirect to={redirect} />}
      <div className="main-container">
        <Customer
          customer={customer}
          pet={pet}
          handleAddPet={handleAddPet}
          loadPet={loadPet}
          setBack={setBack}
          debt={debt}
          current={current}
        />
        {pet.id && (
          <div className="m-1 w-100 ">
            <div className="d-flex justify-content-between">
              <ul className="nav nav-tabs">
                <TabItem
                  option={"consultas"}
                  title={"Consultas"}
                  current={current}
                  setCurrent={setCurrent}
                />
                <TabItem
                  option={"vacunaciones"}
                  title={"Vacunaciones"}
                  current={current}
                  setCurrent={setCurrent}
                />
                <TabItem
                  option={"desparasitaciones"}
                  title={"Desparasitaciones"}
                  current={current}
                  setCurrent={setCurrent}
                />
              </ul>
              {!isReadOnly() && (
                <div className="flex-last">
                  {current === "consultas" && (
                    <button
                      type="button"
                      className="btn btn-primary btn-block"
                      onClick={(e) => handleAddConsultation(e)}
                    >
                      + Consulta
                    </button>
                  )}
                  {current === "vacunaciones" && (
                    <button
                      type="button"
                      className="btn btn-primary btn-block"
                      onClick={(e) => handleAddVaccination(e)}
                    >
                      + Vacunación
                    </button>
                  )}
                  {current === "desparasitaciones" && (
                    <button
                      type="button"
                      className="btn btn-primary btn-block"
                      onClick={(e) => handleAddDeworming(e)}
                    >
                      + Desparasitación
                    </button>
                  )}
                </div>
              )}
            </div>
            <div className="mt-1">
              <Consultations pet={pet} current={current} />
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default CustomerView
