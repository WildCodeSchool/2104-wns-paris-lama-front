import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { Navbar } from "./components/Navbar";
import { AllCoursesPage } from "./components/AllCoursesPage";

function App(): JSX.Element {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <section>
          <Switch>
            <Route path="/test">
              <AllCoursesPage />
            </Route>
            <Route path="/:categories/:id">
              <h1>Hello World!</h1>
            </Route>
          </Switch>
        </section>
      </div>
    </Router>
  );
}

export default App;
