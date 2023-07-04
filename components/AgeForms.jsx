import React from "react";

const AgeForms = () => {
  return (
    <div className='flex items-center justify-center w-full'>
      <div className='join flex w-full'>
        <input
          className='input input-bordered join-item w-full'
          placeholder='Age'
          type='number'
          required
        />
        <button className='btn join-item rounded-r-full text-primary'>
          Update
        </button>
      </div>
    </div>
  );
};

export default AgeForms;
