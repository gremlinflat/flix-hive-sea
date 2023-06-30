import React from "react";
import { HiMiniTicket } from "react-icons/hi2";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className='footer footer-center p-5 bg-base-300 text-base-content'>
      <div className='py-0 gap-1'>
        <p className='text-sm'>
          Copyright © 2023 FlixHive - Some right reserved.
        </p>
        <p className='text-sm'>
          This site is dedicated for Compfest 15 SEA Technical Challenge
        </p>
        <p className='text-sm'>
          Made with ❤️ by{" "}
          <Link
            href='https://github.com/gremlinflat'
            className='text-blue-500 hover:underline'
            target='_blank'
            rel='noopener noreferrer'
          >
            gremlinflat_
          </Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
