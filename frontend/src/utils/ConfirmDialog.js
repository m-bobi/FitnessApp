import React from 'react';
import { confirmable, createConfirmation } from 'react-confirm';

const ConfirmDialog = ({ show, proceed, dismiss, cancel, message }) => (
  show ? (
    <div className="confirm-dialog">
      <div className="confirm-dialog-content">
        <p>{message}</p>
        <button className='firstButton' onClick={proceed}>Yes</button>
        <button className='secondButton' onClick={cancel}>No</button>
      </div>
    </div>
  ) : null
);

export default confirmable(ConfirmDialog);