import React from 'react'

const Amount = ({ text, value }) => {
  return <div className="amount-row mx-2">
    <div className="amount-label mr-4">{text}:</div>
    <div className="amount">{value}</div>
  </div>
}

export default Amount
