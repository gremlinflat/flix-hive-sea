import React from "react";
import Link from "next/link";
import { HiMiniTicket } from "react-icons/hi2";
import { BsFillPersonFill, BsFillCreditCard2FrontFill } from "react-icons/bs";
import { BiArrowFromBottom, BiArrowToBottom } from "react-icons/bi";
import Modal from "./Modal";

const NavBar = () => {
  // const handleLogout = () => {
  const handleDeposit = (val) => {
    console.log("deposit", val);
  };
  return (
    <>
      <div className='navbar bg-base-100 shadow-xl rounded-b-2xl '>
        <div className='flex-1'>
          <Link
            href='/'
            className='btn btn-ghost normal-case font-bold text-xl'
          >
            <HiMiniTicket /> FlixHive
          </Link>
        </div>
        <div className='flex-none'>
          <div className='dropdown dropdown-end px-2'>
            <label tabIndex={0} className='btn btn-ghost px-0'>
              <a class='btn btn-ghost text-secondary normal-case text-base font-bold'>
                <BsFillCreditCard2FrontFill className='inline-block mr-1' />
                IDR. 999999
              </a>
            </label>
            <div
              tabIndex={0}
              className='mt-3 z-[1] card card-compact dropdown-content w-48 bg-base-100 shadow-lg'
            >
              <div className='card-body'>
                <div className='card-actions '>
                  <button
                    className='btn btn-ghost flex w-full text-success'
                    onClick={() => window.modal_1.showModal()}
                  >
                    <BiArrowFromBottom className='inline-block mr-1' />
                    Deposit
                  </button>
                  <button
                    className='btn btn-ghost flex w-full text-error'
                    onClick={() => window.modal_2.showModal()}
                  >
                    <BiArrowToBottom className='inline-block mr-1' />
                    Withdraw
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className='dropdown dropdown-end'>
            <label tabIndex={0} className='btn btn-ghost btn-circle avatar'>
              <BsFillPersonFill className='h-8 w-8 rounded-full' />
            </label>
            <ul
              tabIndex={0}
              className='menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52'
            >
              <li>
                <a onClick={() => window.modal_3.showModal()}>Update Age</a>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* modal */}
      <Modal
        modal_id={"modal_1"}
        type={"credit-deposit"}
        action={handleDeposit}
      />
      <Modal
        modal_id={"modal_2"}
        type={"credit-withdraw"}
        action={handleDeposit}
      />
      <Modal modal_id={"modal_3"} type={"age-update"} action={handleDeposit} />
    </>
  );
};

export default NavBar;
