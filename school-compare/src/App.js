import logo from "./logo.svg";
import "./App.css";
import Navbar from "./Components/Navbar";

import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Schools from "./Pages/Schools";
import Favourites from "./Pages/Favourites";
import Forum from "./Pages/Forum";
import Feedback from "./Pages/Feedback";
import Login from "./Pages/Login";
import Error from "./Pages/Error";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/schools" element={<Schools />} />
        <Route path="/favourites" element={<Favourites />} />
        <Route path="/forum" element={<Forum />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
}

export default App;
