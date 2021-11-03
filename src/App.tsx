/* eslint-disable no-alert */
import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
  useParams,
} from "react-router-dom";
import "./App.css";
import { NavBar } from "./components/NavMenu/NavBar";
import { Register } from "./views/Register";
import { getCurrentUser } from "./utils/auth";
import { UserContextProvider, UserState } from "./store/userContext";
import { ClassRoomContextProvider, IClassRoomState } from "./store/classRoom";

import { Login } from "./views/Login";
import { Landing } from "./views/Landing";
import { Dashboard } from "./views/Dashboard";
import { ClassRoom } from "./views/ClassRoom";
import { Course } from "./views/Course";
import { CreateCourse } from "./views/CreateCourse";
import { CreateClassRoom } from "./views/CreateClassRoom";
import {
  useGetClassesQuery,
  useGetOneClassRoomQuery,
} from "./graphql/generated/graphql";
import { CourseContextProvider, ICourseState } from "./store/course";

export type ClassParams = {
  id: string;
};
function App(): JSX.Element {
  const [user, userSet] = useState<UserState | null>(null);
  const updateUser = (_user: UserState | null) => userSet(_user);
  useEffect(() => {
    const d = getCurrentUser();
    if (d) {
      userSet(d);
    }
  }, []);

  const [classRooms, classRoomsSet] = useState<Array<IClassRoomState> | []>([]);
  const updateClassRooms = (_classRoom: Array<IClassRoomState> | []) =>
    classRoomsSet(_classRoom);
  const { data } = useGetClassesQuery();
  useEffect(() => {
    if (data && data.getClasses) {
      updateClassRooms(data.getClasses);
    }
  }, [data]);

  const [courses, coursesSet] = React.useState<ICourseState | null>(null);
  const updateCourses = (_course: ICourseState | null) => coursesSet(_course);

  return (
    <UserContextProvider value={{ user, updateUser }}>
      <ClassRoomContextProvider value={{ classRooms, updateClassRooms }}>
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
                <CourseContextProvider value={{ courses, updateCourses }}>
                  <Route path="/class-room/:id" exact component={ClassRoom} />
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
                </CourseContextProvider>
                <Route
                  path="/create-class-room"
                  exact
                  component={CreateClassRoom}
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
          <li className="bg-purple-300" />
          <li className="bg-purple-300" />
          <li className="bg-green-300" />
          <li className="bg-red-300" />
          <li className="bg-gray-900" />
          <li className="bg-blue-300" />
          <li className="border-purple-300" />
          <li />
        </ul>
      </ClassRoomContextProvider>
    </UserContextProvider>
  );
}

export default App;
