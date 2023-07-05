import React from "react";
import CreditForms from "./CreditForms";
import AgeForms from "./AgeForms";

const Modal = ({ modal_id, type, action, placeholder }) => {
  return (
    <dialog id={modal_id} className='modal'>
      <form method='dialog' className='modal-box'>
        {type === "credit-deposit" ? (
          <CreditForms isDeposit={true} action={action} modalId={modal_id} />
        ) : null}
        {type === "credit-withdraw" ? (
          <CreditForms isDeposit={false} action={action} modalId={modal_id} />
        ) : null}
        {type === "age-update" ? (
          <AgeForms
            action={action}
            placeholder={placeholder}
            modalId={modal_id}
          />
        ) : null}
      </form>
      <form method='dialog' className='modal-backdrop'>
        <button>close</button>
      </form>
    </dialog>
  );
};

export default Modal;
