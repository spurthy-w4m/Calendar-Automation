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
            
          </div>
        </div>

        <div className={`hidden px-2 items-center lg:flex ${isNavOpen ? "block" : "hidden"}`}>
          
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

          
        </div>

        

      </div>
    </nav>
  );
};

Navbar.propTypes = {
  user: PropTypes.string,
  isAuth: PropTypes.bool,
};

export default Navbar;
