import { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const Navbar = ({ user, isAuth }) => {
  const [isNavOpen, setNavOpen] = useState(false);

  const toggleNav = () => {
    setNavOpen(!isNavOpen);
    console.log(isNavOpen);
  };

  return (
    <nav className="grid grid-cols-5 items-center py-2 px-4 lg:p-4">
      <div className="col-span-1 p-2 flex items-center">
        <img
          src="../public/w4m.png"
          className="fill-current text-white h-[100%] w-[100%] mr-2"
          alt="W4M Logo"
        />
      </div>

      <div className="col-span-4 flex justify-between items-center">
        <div className={`hidden lg:inline-flex ${isNavOpen ? "block" : "hidden"}`}>
          <div className="flex items-center">
            <div className="lg:w-auto px-2 text-sm mx-2 text-black text-opacity-90 hover:text-opacity-100">
              Home
            </div>
          </div>
        </div>

        <div className={`hidden px-2 items-center lg:flex ${isNavOpen ? "block" : "hidden"}`}>
          <div className="lg:w-auto px-3 mx-2 text-sm text-black text-opacity-55 hover:text-opacity-70">
            Home
          </div>
          {isAuth && (
            <div className="lg:w-auto px-3 mx-2 text-sm text-[#154cefed] text-opacity-55 hover:text-opacity-70">
              {user}
            </div>
          )}

          {!isAuth && (
            <Link
              to="/login"
              className="lg:w-auto px-3 mx-2 text-sm text-black text-opacity-55 hover:text-opacity-70"
            >
              Login
            </Link>
          )}

          <Link
            to="/google-calendar"
            className="lg:w-auto px-3 mx-2 text-sm text-black text-opacity-55 hover:text-opacity-70"
          >
            Google Calendar
          </Link>

          <button
            className="text-white lg:inline-flex px-4 hover:bg-gray-200 rounded ml-auto hidden hover:text-white outline-none nav-toggler"
            onClick={toggleNav}
          >
            <i className="text-gray-400 text-4xl">&#8801;</i>
          </button>
        </div>

        <button
          className="text-white inline-flex px-4 hover:bg-gray-200 rounded ml-auto lg:hidden hover:text-white outline-none nav-toggler"
          onClick={toggleNav}
        >
          <i className="text-gray-400 text-4xl">&#8801;</i>
        </button>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  user: PropTypes.string,
  isAuth: PropTypes.bool,
};

export default Navbar;
