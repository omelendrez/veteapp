import React from 'react'
import Amount from './Amount'
import { formatNumber } from '../../../services/utils'

const Balance = ({ amount, paid }) => {
  const amounts = [
    { text: 'Consulta', value: formatNumber(amount) }]

  return (
    <div className={`float-right text-right balance ${amount > paid ? 'debt' : ''}`}>
      {amounts.map((amount, index) => <Amount key={index} text={amount.text} value={amount.value} />)}
    </div>
  )
}

export default Balance