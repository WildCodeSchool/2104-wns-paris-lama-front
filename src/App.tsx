/* eslint-disable no-alert */
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import AddCourse from "./components/CourseForm/AddCourse";
import { AllCoursesPage } from "./components/AllCoursesPage";
import { Courses } from "./components/Courses";
import ScrollTop from "./components/ScrollTop";
import bg from "./assets/svg/bg.svg";
import { NavBar } from "./components/NavMenu/NavBar";
import { Register } from "./views/Register";
import { getCurrentUser } from "./utils/auth";
import { UserContextProvider, UserState } from "./store/userContext";
import { Login } from "./views/Login";

function App(): JSX.Element {
  // const [user, userSet] = useGlobalValue();
  const [user, userSet] = useState<UserState>({} as UserState);
  const updateUser = (_user: UserState) => userSet(_user);
  useEffect(() => {
    const d = getCurrentUser();
    if (d) {
      userSet(d);
    }
  }, []);
  // userSet(d);
  // console.log(user);

  return (
    <UserContextProvider value={{ user, updateUser }}>
      <Router>
        <div
          className="App"
          style={{ backgroundImage: `url(${bg})`, minHeight: "100vh" }}
        >
          <NavBar />

          <section>
            <Switch>
              <Route path="/course">
                <AllCoursesPage />
              </Route>
              <Route path="/register">
                <Register />
              </Route>
              <Route path="/login">
                <Login />
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
          </section>
        </div>
      </Router>
    </UserContextProvider>
  );
}

export default App;
