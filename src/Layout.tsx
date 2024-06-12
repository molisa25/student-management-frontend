import React, { type PropsWithChildren } from "react";
import { Toaster } from 'react-hot-toast';
import Header from "./components/Header";
import Footer from "./components/Footer";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Toaster />
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
