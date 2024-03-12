import React from "react";
import { useEffect, useState } from "react";
import vinyl from "./assets/vinyl.png";
import "./App.css";
import Dropdown from "./Dropdown";
import { useNavigate } from "react-router-dom";

export default function Header({ data, name, setUserLoggedIn }) {
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
    <nav className="border-gray-200 bg-purple-950 h-1/6">
      {name != null ? (
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <img src={vinyl} alt="ingen logo" className="mb-4 w-16"></img>
          <h1 className="self-center text-5xl font-semibold whitespace-nowrap dark:text-white mr-8 ">
            Welcome {name}
          </h1>
          <button
            onClick={goToStats}
            className={
              activeButton === 1
                ? "self-center text-2xl font-semibold whitespace-nowrap text-green-500 hover:text-green-700"
                : "self-center text-2xl font-semibold whitespace-nowrap dark:text-white hover:text-green-700"
            }
          >
            Statistics
          </button>
          <button
            onClick={home}
            className={
              activeButton === 0
                ? "self-center text-2xl font-semibold whitespace-nowrap text-green-500 hover:text-green-700"
                : "self-center text-2xl font-semibold whitespace-nowrap dark:text-white hover:text-green-700"
            }
          >
            Home
          </button>
          <button
            onClick={logout}
            className="self-center text-xl font-semibold whitespace-nowrap dark:text-white hover:text-green-700"
          >
            Log Out
          </button>
        </div>
      ) : (
        <div className="max-w-screen-xl flex flex-wrap items-center mx-auto p-4">
          <img src={vinyl} alt="ingen logo" width="75px" className="mb-4"></img>
          <h1 className="text-5xl font-semibold whitespace-nowrap dark:text-white ml-20">
            Welcome{" "}
          </h1>
        </div>
      )}
    </nav>
  );
}
