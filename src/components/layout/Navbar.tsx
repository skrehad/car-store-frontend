import { useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/features/hook";
import { logout, useCurrentUser } from "../../redux/features/auth/authSlice";
import { User } from "../../constants/type";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dispatch = useAppDispatch();
  const user = useAppSelector(useCurrentUser) as User;

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const handleLogout = () => dispatch(logout());

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center py-4">
        {/* Logo */}
        <Link
          to="/"
          className="text-3xl font-bold cursor-pointer text-blue-600 dark:text-yellow-400"
        >
          CarShop
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          <Link
            to="/"
            className="text-lg   text-gray-900 dark:text-white hover:text-blue-600"
          >
            Home
          </Link>
          <Link
            to="/allCars"
            className="text-lg  text-gray-900 dark:text-white hover:text-blue-600"
          >
            All Cars
          </Link>
          <Link
            to="/about"
            className="text-lg text-gray-900 dark:text-white hover:text-blue-600"
          >
            About Us
          </Link>
          <Link
            to="/contact"
            className="text-lg text-gray-900 dark:text-white hover:text-blue-600"
          >
            Contact
          </Link>

          {!user ? (
            <Link
              to="/login"
              className="text-lg text-blue-600 dark:text-yellow-400 font-semibold"
            >
              Login
            </Link>
          ) : (
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="w-10 h-10 cursor-pointer rounded-full border-2 border-gray-300 dark:border-white overflow-hidden focus:outline-none"
              >
                <img
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  alt="User Avatar"
                  className="w-full h-full object-cover"
                />
              </button>
              {isDropdownOpen && (
                <div className="absolute cursor-pointer right-0 mt-2 w-48 bg-white dark:bg-gray-800 text-gray-800 dark:text-white rounded-lg shadow-lg z-10">
                  <ul className="py-2">
                    <li>
                      <Link
                        to={`/${user?.role}/dashboard`}
                        className="block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700"
                      >
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="block cursor-pointer w-full text-left px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-3xl focus:outline-none text-gray-900 dark:text-white"
          >
            {isMenuOpen ? "✖" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 py-4 px-6 space-y-4">
          <Link
            to="/"
            className="block text-lg text-gray-900 dark:text-white hover:text-blue-600"
          >
            Home
          </Link>
          <Link
            to="/allCars"
            className="block text-lg text-gray-900 dark:text-white hover:text-blue-600"
          >
            All Cars
          </Link>
          <Link
            to="/about"
            className="block text-lg text-gray-900 dark:text-white hover:text-blue-600"
          >
            About Us
          </Link>
          <Link
            to="/contact"
            className="block text-lg text-gray-900 dark:text-white hover:text-blue-600"
          >
            Contact
          </Link>
          {!user ? (
            <Link
              to="/login"
              className="block text-lg text-blue-600 dark:text-yellow-400 font-semibold"
            >
              Login
            </Link>
          ) : (
            <>
              <Link
                to="/dashboard"
                className="block text-lg text-gray-900 dark:text-white hover:text-blue-600"
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left text-lg text-gray-900 dark:text-white hover:text-blue-600"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
