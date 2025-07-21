import React from "react";

import Hero from "./components/Hero";
import Feature from "./components/Feature";
import PopularBlogs from "./components/PopularBlogs";

import ExploreJobs from "./components/ExploreJobs";

const App = () => {
  return (
    <div className="w-full h-fit">
    
      <Hero />
      <ExploreJobs/>
      
      <PopularBlogs/>
      <Feature/>
    
    </div>
  );
};

export default App;
