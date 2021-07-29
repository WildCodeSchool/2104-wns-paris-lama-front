import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import AddCourse from "./components/CourseForm/AddCourse";
import { AllCoursesPage } from "./components/AllCoursesPage";
import { Courses } from "./components/Courses";
import ScrollTop from "./components/ScrollTop";
import { Title } from "./components/Title";
import { NavBar } from "./components/NavMenu/NavBar";

function App(): JSX.Element {
  return (
    <>
      <div className="App">
        <NavBar />
        <Router>
          {/* <section>
          <Switch>
            <Route path="/course">
              <AllCoursesPage />
            </Route>
            <Route path="/new-courses">
              <AddCourse />
            </Route>
            <Route path="/:categories/:id">
              <ScrollTop />
              <Courses />
            </Route>
            <Route path="/new-courses">
              <AddCourse />
            </Route>
          </Switch>
        </section> */}
        </Router>
      </div>
    </>
  );
}

export default App;
