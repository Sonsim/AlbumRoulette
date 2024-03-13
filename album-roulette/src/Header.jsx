import React from "react";
import { useEffect, useState } from "react";
import vinyl from "./assets/vinyl.png";
import "./App.css";
import Dropdown from "./Dropdown";
import { useNavigate } from "react-router-dom";

export default function Header({ name, setUserLoggedIn }) {
  const navigate = useNavigate();
  const [activeButton, setActiveButton] = useState(0);
  const home = () => {
    navigate("/home");
    setActiveButton(0);
  };

  const logout = () => {
    setUserLoggedIn(null);
    localStorage.clear();
    navigate("/login");
  };
  const goToStats = () => {
    navigate("/stats");
    setActiveButton(1);
  };
  return (
    <nav className="bg-zinc-900 h-5/6">
      {name != null ? (
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <h1 className="self-center text-s text-white sm:text-s, md:text-3xl lg:text-5xl">
            Welcome {name}
          </h1>
          <button
            onClick={goToStats}
            className={
              activeButton === 1
                ? "self-center text-xs sm:text-xs md:text-xl lg:text-2xl font-semibold whitespace-nowrap text-green-500 hover:text-green-700"
                : "self-center text-xs sm:text-xs md:text-xl lg:text-2xl font-semibold whitespace-nowrap dark:text-white hover:text-green-700 sm:text-xs, md:text-lg lg:text-2xl"
            }
          >
            Statistics
          </button>
          <button
            onClick={home}
            className={
              activeButton === 0
                ? "self-center text-xs sm:text-xs md:text-xl lg:text-2xl font-semibold whitespace-nowrap text-green-500 hover:text-green-700"
                : "self-center text-xs sm:text-xs md:text-xl lg:text-2xl font-semibold whitespace-nowrap dark:text-white hover:text-green-700"
            }
          >
            Home
          </button>
          <button
            onClick={logout}
            className="self-center text-xs sm:text-xs md:text-xl lg:text-2xl font-semibold whitespace-nowrap dark:text-white hover:text-green-700"
          >
            Log Out
          </button>
        </div>
      ) : (
        <div className="max-w-screen-xl flex flex-wrap items-center mx-auto sm:p-2 md:p-4 lg:p-10"></div>
      )}
    </nav>
  );
}
