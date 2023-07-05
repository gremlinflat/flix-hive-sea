import { useState, useEffect } from "react";
import Link from "next/link";
import useSWR from "swr";
import { HiMiniTicket } from "react-icons/hi2";
import { BsFillCreditCard2FrontFill } from "react-icons/bs";
import { BiArrowFromBottom, BiArrowToBottom, BiLogOut } from "react-icons/bi";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

import Modal from "./Modal";
import { useAuth } from "@/lib/auth";
import fetcher from "@/utils/fetcher";

const NavBar = () => {
  const {
    user,
    signout,
    signinWithGitHub,
    signinWithGoogle,
    // getUserToken,
    userProfile,
    userToken,
    setUserProfile,
  } = useAuth();

  const handleLogout = () => {
    signout();
  };

  const handleCredit = (val) => {
    const newCredit = parseInt(userProfile?.credit) + parseInt(val);
    if (newCredit < 0) {
      alert("You don't have enough credit to do this action");
      return;
    } //fail case
    fetch("/api/user/mutateCredit", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
        token: userToken,
      }),
      body: JSON.stringify({
        credit: newCredit ?? 0,
      }),
    });
    setUserProfile({ ...userProfile, credit: newCredit });
  };

  const handleAge = (val) => {
    const newAge = parseInt(val);
    if (newAge < 0) {
      alert("Age must be greater than 0");
      return;
    } //fail case
    console.log("posting new age", newAge);
    fetch("/api/user/mutateAge", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
        token: userToken,
      }),
      body: JSON.stringify({
        age: newAge ?? 0,
      }),
    });
    setUserProfile({ ...userProfile, age: newAge });
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
          {user ? (
            <>
              <div className='dropdown dropdown-end px-2'>
                <label tabIndex={0} className='btn btn-ghost px-0'>
                  <a className='btn btn-ghost text-secondary normal-case text-base font-bold'>
                    <BsFillCreditCard2FrontFill className='inline-block mr-1' />
                    IDR. {userProfile?.credit ?? "----"}
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
                  <img className='h-8 w-8 rounded-full' src={user.photoUrl} />
                </label>
                <ul
                  tabIndex={0}
                  className='menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52'
                >
                  <li>
                    <button
                      className='p-3 text-center w-full rounded-lg mb-2 font-semibold'
                      onClick={() => window.modal_3.showModal()}
                    >
                      Update Age
                    </button>
                  </li>
                  <li>
                    <button
                      className='p-3 text-center w-full rounded-lg mb-2 bg-red-500 font-semibold hover:bg-red-400 text-white hover:text-gray-100'
                      onClick={handleLogout}
                    >
                      <BiLogOut className='inline-block mr-1' />
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <div className='dropdown dropdown-end'>
              <label tabIndex={0}>
                <button className='btn btn-primary text-white normal-case text-base font-bold'>
                  Sign-In
                </button>
              </label>
              <ul
                tabIndex={0}
                className='menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52'
              >
                <li>
                  <button
                    onClick={(e) => signinWithGitHub()}
                    className='p-3 text-center w-full bg-gray-800 text-white rounded-lg mb-2'
                  >
                    <FaGithub className='inline-block mr-1' />
                    Sign-in With Github
                  </button>
                </li>
                <li>
                  <button
                    onClick={(e) => signinWithGoogle()}
                    className='p-3 text-center w-full bg-white text-black rounded-lg hover:bg-gray-300 hover:text-black mb-2'
                  >
                    <FcGoogle className='inline-block mr-1' />
                    Sign-in With Google
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
      {/* modal */}
      <Modal
        modal_id={"modal_1"}
        type={"credit-deposit"}
        action={handleCredit}
      />
      <Modal
        modal_id={"modal_2"}
        type={"credit-withdraw"}
        action={handleCredit}
      />
      <Modal
        modal_id={"modal_3"}
        type={"age-update"}
        action={handleAge}
        placeholder={userProfile?.age}
      />
    </>
  );
};

export default NavBar;
