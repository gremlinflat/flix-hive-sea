import React from "react";
import CreditForms from "./CreditForms";
import AgeForms from "./AgeForms";

const Modal = ({ modal_id, type, action }) => {
  return (
    <dialog id={modal_id} className='modal'>
      <form method='dialog' className='modal-box'>
        {type === "credit-deposit" ? (
          <CreditForms isDeposit={true} action={action} />
        ) : null}
        {type === "credit-withdraw" ? (
          <CreditForms isDeposit={false} action={action} />
        ) : null}
        {type === "age-update" ? <AgeForms action={action} /> : null}
      </form>
      <form method='dialog' className='modal-backdrop'>
        <button>close</button>
      </form>
    </dialog>
  );
};

export default Modal;
