import React from "react";

const AgeForms = ({ modalId, placeholder, action }) => {
  const handleButtonClick = () => {
    const inputValue = document.querySelector(`#${modalId} #amount`).value;
    console.log(inputValue);
    if (inputValue === "") return;
    action(parseInt(inputValue));
  };

  return (
    <div className='flex items-center justify-center w-full'>
      <div className='join flex w-full'>
        <input
          id='amount'
          className='input input-bordered join-item w-full'
          placeholder={placeholder ?? "How old are you?"}
          type='number'
          required
        />
        <button
          className='btn join-item rounded-r-full font-semibold text-primary'
          onClick={handleButtonClick}
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default AgeForms;
