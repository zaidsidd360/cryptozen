import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { UserAuth } from "../context/AuthContext";

const Navbar = () => {
  const [navToggle, setNavToggle] = useState(false);

  const { user, logout } = UserAuth();
  const navigate = useNavigate();

  const handleNavToggle = () => {
    setNavToggle(!navToggle);
  };

  const handleSignOut = async () => {
    try {
      await logout();
      navigate("/");
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <div className="rounded-div flex items-center justify-between h-20 font-bold">
      <Link to="/">
        <h1 className="text-2xl">CryptoZen</h1>
      </Link>
      <div className="hidden md:block">
        <ThemeToggle />
      </div>
      {user?.email ? (
        <div className="hidden md:block">
          <Link className="p-4" to="/account">
            Account
          </Link>
          <button onClick={handleSignOut}>Sign Out</button>
        </div>
      ) : (
        <div className="hidden md:block">
          <Link to="/signin" className="p-4 hover:text-accent">
            Sign In
          </Link>
          <Link
            to="/signup"
            className="bg-button text-btnText px-5 py-2 ml-2 rounded-[20px] shadow-lg hover:drop-shadow-2xl"
          >
            Sign Up
          </Link>
        </div>
      )}
      {/* Mobile Menu Icon */}
      <div
        onClick={handleNavToggle}
        className="block md:hidden cursor-pointer z-10"
      >
        {navToggle ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
      </div>
      {/* Mobile Menu */}
      <div
        className={
          navToggle
            ? "md:hidden fixed left-0 top-20 flex flex-col items-center justify-between w-full h-[90%] bg-primary ease-in duration-300 z-10"
            : "fixed left-[-100%] top-20 h-[90%] flex flex-col items-center justify-between ease-in duration-300"
        }
      >
        <ul className="w-full p-4">
          <li onClick={handleNavToggle} className="border-b py-6">
            <Link to="/">Home</Link>
          </li>
          <li onClick={handleNavToggle} className="border-b py-6">
            <Link to="/account">Account</Link>
          </li>
          <li className="py-6">
            <ThemeToggle />
          </li>
        </ul>
        {user?.email ? (
          <div className="flex flex-col w-full p-4">
            <button
              className="w-full my-2 p-3 bg-button text-btnText rounded-2xl shadow-xl"
              onClick={handleSignOut}
            >
              Sign Out
            </button>
          </div>
        ) : (
          <div className="flex flex-col w-full p-4">
            <Link to="/signin">
              <button
                onClick={handleNavToggle}
                className="w-full my-2 p-3 bg-primary text-primary border border-secondary rounded-2xl shadow-xl"
              >
                Sign In
              </button>
            </Link>
            <Link to="/signup">
              <button
                onClick={handleNavToggle}
                className="w-full my-2 p-3 bg-button text-btnText rounded-2xl shadow-xl"
              >
                Sign Up
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
