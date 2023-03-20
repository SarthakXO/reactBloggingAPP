import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navbar";
import Login from "./pages/Login";
import { Main } from "./pages/main/Main";
import CreatePost from "./pages/create-post/CreatePost";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./config/firebase";
import NoLoginUser from "./pages/NoLoginUser";

function App() {
  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/createpost"
            element={user ? <CreatePost /> : <NoLoginUser />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
