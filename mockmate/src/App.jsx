import { useState } from "react";
import "./App.css";
import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { Footer } from "./components/Footer";
import Home from "./pages/Home";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
    <Home/>
    </>
  );
}

export default App;
