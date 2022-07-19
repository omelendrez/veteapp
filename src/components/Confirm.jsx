import React from 'react'

const Confirm = ({ title, question, okButton, cancelButton, confirmDelete, cancelDelete }) => {
  const backgroundStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(179,182,183,.5)',
    zIndex: 999
  }
  return (
    <div style={backgroundStyle}>
      <div className="modal fade show" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{title}</h5>
            </div>
            <div className="modal-body">
              <p>{question}</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => cancelDelete()}>{cancelButton}</button>
              <button type="button" className="btn btn-danger" onClick={() => confirmDelete()}>{okButton}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Confirm