import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import AddCourse from "./components/AddCourse";
import { Navbar } from "./components/Navbar";
import { AllCoursesPage } from "./components/AllCoursesPage";
import { Courses } from "./components/Courses";
import ScrollTop from "./components/ScrollTop";

function App(): JSX.Element {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <section>
          <Switch>
            <Route path="/course">
              <AllCoursesPage />
            </Route>
            <Route path="/add-courses">
              <AddCourse />
            </Route>
            <Route path="/:categories/:id">
              <ScrollTop />
              <Courses />
            </Route>
          </Switch>
        </section>
      </div>
    </Router>
  );
}

export default App;
