import React from "react";

const CreditForms = ({ action, isDeposit }) => {
  const handleButtonClick = () => {
    const inputValue = document.getElementById("amount").value;
    if (inputValue === "") return;
    action(inputValue);
  };

  return (
    <div className='flex items-center justify-center w-full'>
      <div className='join flex w-full'>
        <span className='input-addon input-bordered border-base text-gray-500 font-bold'>
          IDR
        </span>
        <input
          id='amount'
          className='input input-bordered join-item w-full'
          placeholder='How much do you want?'
          type='number'
          required
        />
        <button
          className={`btn join-item rounded-r-full ${
            isDeposit ? "text-error" : "text-success"
          }`}
          required
          onClick={handleButtonClick}
        >
          {isDeposit ? "Top up" : "Withdraw"}
        </button>
      </div>
    </div>
  );
};

export default CreditForms;
