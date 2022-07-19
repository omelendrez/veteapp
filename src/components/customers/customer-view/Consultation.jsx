import React from 'react'
import Balance from './Balance'
import { formatDate, getTreatmentStage, formatDateFull, isReadOnly } from '../../../services/utils'

const Consultation = ({ consultation, editConsultation, deleteConsultation }) => {
  const { id, date, anamnesis, clinicalExamination, diagnosis, treatment, nextAppointment, amount, paid, vaccination, deworming, treatmentStage, userName, updatedAt } = consultation

  return (
    <div className="card consultation pb-2">
      <div className="card-body">
        <p className="float-right text-capitalize small">
          <div>{userName || ''}</div>
          <div>{formatDateFull(updatedAt)}</div>
        </p>
        {!isReadOnly() && amount > 0 && <Balance amount={amount} paid={paid} />}
        <h6 className="card-title">{formatDate(date)}</h6>
        {anamnesis && <p className="card-text"><b>Anamnesis</b>: {anamnesis}</p>}
        {clinicalExamination && <p className="card-text"><b>Examen Clinico</b>: {clinicalExamination}</p>}
        {diagnosis && <p className="card-text"><b>Diagnóstico</b>: {diagnosis}</p>}
        {treatment && <p className="card-text"><b>Tratamiento</b>: {treatment}</p>}
        {vaccination && <p className="card-text"><b>Vacunación</b>: {vaccination}</p>}
        {deworming && <p className="card-text"><b>Desparasitación</b>: {deworming}</p>}
        {treatmentStage && <p className="card-text"><b>Etapa tratamiento</b>: {getTreatmentStage(treatmentStage)}</p>}
        {nextAppointment && <h6 className="card-text">Próximo turno: {formatDate(nextAppointment)}</h6>}
      </div>
      {!isReadOnly() &&
        <div className="mx-3">
          <button
            type="button"
            className="btn btn-info m-1"
            onClick={() => editConsultation(id)}
          >Modificar</button>
          <button
            type="button"
            className="btn btn-danger m-1 float-right"
            onClick={() => deleteConsultation(consultation)}
          >Desactivar</button>
        </div>
      }
    </div>
  )
}

export default Consultation
