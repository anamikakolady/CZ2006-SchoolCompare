import "./App.css";
import Navbar from "./Components/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Schools from "./Pages/Schools/SchoolsMainPage";
import Favourites from "./Pages/Favourites";
import Forum from "./Pages/Forum";
import Feedback from "./Pages/Feedback";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import Error from "./Pages/Error";
import Primary from "./Pages/Schools/Primary/Primary";
import Secondary from "./Pages/Schools/Secondary/Secondary";
import Tertiary from "./Pages/Schools/Tertiary/Tertiary";

import PrimarySubjects from "./Pages/Schools/Primary/PrimarySubjects";
import SecondarySubjects from "./Pages/Schools/Secondary/SecondarySubjects";
import TertiarySubjects from "./Pages/Schools/Tertiary/TertiarySubjects";


function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route>
          <Route path="schools" element={<Schools />} />
          <Route>
            {" "}
            {/* Nested routes for  /schools/primary*/}
            <Route path="schools/primary" element={<Primary />} />
            <Route path="schools/primary/general" element={<Primary />} />
            <Route
              path="schools/primary/subjects-offered"
              element={<PrimarySubjects />}
            />
            <Route path="schools/primary/ccas" element={<Primary />} />
            <Route
              path="schools/primary/electives&programmes"
              element={<Primary />}
            />
          </Route>
          <Route>
            {" "}
            {/* Nested routes for  /schools/secondary*/}
            <Route path="schools/secondary" element={<Secondary />} />
            <Route path="schools/secondary/general" element={<Secondary />} />
            <Route
              path="schools/secondary/cut-off-points"
              element={<Secondary />}
            />
            <Route
              path="schools/secondary/subjects-offered"
              element={<SecondarySubjects />}
            />
            <Route path="schools/secondary/ccas" element={<Secondary />} />
            <Route
              path="schools/secondary/electives&programmes"
              element={<Secondary />}
            />
          </Route>
          <Route>
            {" "}
            {/* Nested routes for  /schools/tertiary*/}
            <Route path="schools/tertiary" element={<Tertiary />} />
            <Route path="schools/tertiary/general" element={<Tertiary />} />
            <Route
              path="schools/tertiary/cut-off-points"
              element={<Tertiary />}
            />
            <Route
              path="schools/tertiary/subjects-offered"
              element={<TertiarySubjects />}
            />
            <Route path="schools/tertiary/ccas" element={<Tertiary />} />
            <Route
              path="schools/tertiary/electives&programmes"
              element={<Tertiary />}
            />
          </Route>
        </Route>
        <Route path="favourites" element={<Favourites />} />
        <Route path="forum" element={<Forum />} />
        <Route path="feedback" element={<Feedback />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
}

export default App;
