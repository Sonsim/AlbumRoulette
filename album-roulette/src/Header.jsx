import React from "react";
import { useEffect, useState } from "react";
import vinyl from "./assets/vinyl.png";
import "./App.css";
import Dropdown from "./Dropdown";
import { useNavigate } from "react-router-dom";

export default function Header({ data, name, setUserLoggedIn }) {
  const navigate = useNavigate();

  const home = () => {
    navigate("/home");
  };

  const logout = () => {
    setUserLoggedIn(null);
    localStorage.clear();
    navigate("/login");
  };
  const goToStats = () => {
    navigate("/stats");
  };
  return (
    <nav className="bg-white border-gray-200 bg-black">
      {name != null ? (
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <img src={vinyl} alt="ingen logo" className="mb-4 w-16"></img>
          <h1 className="self-center text-4xl font-semibold whitespace-nowrap dark:text-white mr-8">
            Welcome {name}
          </h1>
          <button
            onClick={goToStats}
            className="self-center text-1xl font-semibold whitespace-nowrap dark:text-white"
          >
            Statistics
          </button>
          <button
            onClick={home}
            className="self-center text-1xl font-semibold whitespace-nowrap dark:text-white"
          >
            Home
          </button>
          <button
            onClick={logout}
            className="self-center text-1xl font-semibold whitespace-nowrap dark:text-white"
          >
            Log Out
          </button>
        </div>
      ) : (
        <div className="max-w-screen-xl flex flex-wrap items-center mx-auto p-4">
          <img src={vinyl} alt="ingen logo" width="75px" className="mb-4"></img>
          <h1 className="text-4xl font-semibold whitespace-nowrap dark:text-white ml-20">
            Welcome{" "}
          </h1>
        </div>
      )}
    </nav>
  );
}
