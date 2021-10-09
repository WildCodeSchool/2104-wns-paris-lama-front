/* eslint-disable no-alert */
import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import "./App.css";
import { NavBar } from "./components/NavMenu/NavBar";
import { Register } from "./views/Register";
import { getCurrentUser } from "./utils/auth";
import { UserContextProvider, UserState } from "./store/userContext";
import { Login } from "./views/Login";
import { Landing } from "./views/Landing";
import { Dashboard } from "./views/Dashboard";
import { ClassRoom } from "./views/ClassRoom";
import { Course } from "./views/Course";
import { CreateCourse } from "./views/CreateCourse";
import { CreateClassRoom } from "./views/CreateClassRoom";

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
        <div className="App relative">
          <NavBar />

          <section>
            <Switch>
              <Route
                path="/"
                exact
                render={() => {
                  return user ? (
                    <Redirect to="/dashboard" />
                  ) : (
                    <Redirect to="/landing" />
                  );
                }}
              />
              <Route path="/register" exact component={Register} />
              <Route path="/dashboard" exact component={Dashboard} />
              <Route path="/class-room/:id" exact component={ClassRoom} />
              <Route
                path="/create-class-room"
                exact
                component={CreateClassRoom}
              />

              <Route
                path="/class-room/:id/create-course"
                exact
                component={CreateCourse}
              />
              <Route
                path="/class-room/:class_id/course/:course_id/:step"
                exact
                component={Course}
              />
              <Route path="/login" exact component={Login} />
              <Route path="/landing" exact component={Landing} />
            </Switch>
          </section>
        </div>
      </Router>
      <ul className="circles">
        <li className="bg-yellow-300" />
        <li className="bg-pink-300" />
        <li className="bg-indigo-300" />
        <li className="bg-purple-300" />
        <li className="bg-green-300" />
        <li className="bg-red-300" />
        <li className="bg-gray-900" />
        <li className="bg-blue-300" />
        <li className="border-indigo-300" />
        <li />
      </ul>
    </UserContextProvider>
  );
}

export default App;
