import React from "react";
import { Navbar } from "../components/Navbar";
import { HeroSection } from "../components/HeroSection";
import { Footer } from "../components/Footer";
import { HowItWorks } from "../components/HowItWorks";
import { GuestStartSection } from "../components/GuestStartSection";

const Home = () => {
  return (
    <>
      <HeroSection />
      <HowItWorks/>
      <GuestStartSection/>
      
    </>
  );
};

export default Home;
