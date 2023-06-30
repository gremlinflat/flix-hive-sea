import React from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";

const DashboardShell = ({ children }) => {
  return (
    <div className='container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 content-center'>
      <NavBar />
      <div className='container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='py-8'>{children}</div>
      </div>
      <Footer />
    </div>
  );
};

export default DashboardShell;
