/* eslint-disable no-alert */
import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
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
import { Landing } from "./views/Landing";

function App(): JSX.Element {
  // const [user, userSet] = useGlobalValue();
  const [user, userSet] = useState<UserState | null>(null);
  const updateUser = (_user: UserState | null) => userSet(_user);
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
          className="w-full"
          style={{ backgroundImage: `url(${bg})`, minHeight: "100vh" }}
        >
          <div className="App w-11/12 mx-auto">
            <NavBar />

            <section>
              <Switch>
                <Route path="/course" exact>
                  <AllCoursesPage />
                </Route>
                <Route
                  path="/"
                  exact
                  render={() => {
                    return user ? (
                      <Redirect to="/course" />
                    ) : (
                      <Redirect to="/landing" />
                    );
                  }}
                />
                <Route path="/register" exact component={Register} />
                <Route path="/login" exact component={Login} />
                <Route path="/landing" exact component={Landing} />
                <Route path="/new-courses" exact component={AddCourse} />
                <Route path="/:categories/:id" exact>
                  <ScrollTop />
                  <Courses />
                </Route>
                <Route path="/new-courses" exact component={AddCourse} />
              </Switch>
            </section>
          </div>
        </div>
      </Router>
    </UserContextProvider>
  );
}

export default App;
