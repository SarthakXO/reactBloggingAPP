import React from "react";
import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../config/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const [user] = useAuthState(auth);

  const logoutUser = async () => {
    navigate("/login");
    await signOut(auth);
  };

  return (
    <div className="mb-5">
      <nav className="navbar  navbar-expand-lg navbar-dark bg-dark mb-5">
        <Link className="navbar-brand" to="/">
          {user && user?.displayName}
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link className="nav-link" to="/">
                Home <span className="sr-only"></span>
              </Link>
            </li>
            <li className="nav-item">
              {user ? (
                <Link className="nav-link" to="/createpost">
                  Create Post
                </Link>
              ) : (
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              )}
            </li>
          </ul>
          <form className="form-inline my-2 my-lg-0">
            {user && (
              <>
                <img
                  src={user?.photoURL || "../nodp2.png"}
                  alt="../nodp2.png"
                  width={"40px"}
                  height={"40px"}
                />
                <button
                  className="btn btn-outline-danger mx-2"
                  onClick={logoutUser}
                >
                  Logout
                </button>
              </>
            )}
          </form>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
