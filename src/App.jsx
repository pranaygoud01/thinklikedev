import React from "react";
import NavBar from "./components/NavBar";
import Hero from "./components/Hero";
import Feature from "./components/Feature";

const App = () => {
  return (
    <div className="w-full h-fit">
     <NavBar />
      <Hero />
      <Feature/>
    </div>
  );
};

export default App;
