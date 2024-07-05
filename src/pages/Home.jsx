import React from "react";
import Footer from "../components/Footer";
import Content from "../components/homeSections/Content";
import Navbar from "../components/Navbar";
const Home = () => {


  return (
    <>
      <div>
        <header className="">
         <Navbar />
        </header>
        <Content/>
        <footer className="mt-10">
          <Footer />
        </footer>
      </div>
    </>
  );
};

export default Home;