import React from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";

const DashboardShell = ({ children }) => {
  return (
    <div className='container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 content-center min-h-screen'>
      <NavBar />
      {/* <div className='mx-auto min-h-[80vh] flex flex-col w-full h-full'> */}
      <div className='mx-auto min-h-[80vh] flex flex-col items-center justify-center w-full h-full'>
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default DashboardShell;
