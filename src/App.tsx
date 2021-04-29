import React from "react";
import "./App.css";
import { Navbar } from "./components/Navbar";
import { Courses } from "./components/Courses";

function App(): JSX.Element {
  return (
    <div className="App">
      <Navbar />
      <Courses />
    </div>
  );
}

export default App;
