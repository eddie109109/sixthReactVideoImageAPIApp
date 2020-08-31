import React from 'react';
import Body from "./components/Body";
import Heading from "./components/Heading";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";



function App() {
  return (
    <div className="App">
      <NavBar />
      <Heading />
      <Body />
      <Footer />
    </div>
  );
}

export default App;
