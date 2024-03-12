import { useEffect, useState } from "react";
import "./App.css";
import Header from "./Header";
import axios from "axios";
import Login from "./Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Error from "./Error";
import Stats from "./Stats";
import Background from "./Background";

function App() {
  const [SQLData, setSQLData] = useState([]);
  const [UserLoggedIn, setUserLoggedIn] = useState();
  let isError = false;
  const HeardAlbums = [];
  const AllGenres = [
    { genre: "Metal", counter: 0 },
    { genre: "Pop Rock", counter: 0 },
    { genre: "R&B", counter: 0 },
    { genre: "Folk", counter: 0 },
    { genre: "Hip Hop", counter: 0 },
    { genre: "Blues", counter: 0 },
    { genre: "Rock and Roll", counter: 0 },
  ];
  const [GlobalData, setGlobalData] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:5174/api/get/globalalbums").then((data) => {
      setGlobalData(data.data.recordset);
    });
  }, []);

  useEffect(() => {
    let userID = localStorage.getItem("userID");
    let name = "User" + userID;
    if (userID != null) {
      axios.get(`http://localhost:5174/api/get/albums/${name}`).then((data) => {
        setSQLData(data.data.recordset);
      });
    }
  }, []);
  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = loggedInUser;
      setUserLoggedIn(foundUser);
    }
  }, []);

  const FillArray = () => {
    SQLData.map((album) => {
      if (album.Is_Heard == 1) {
        HeardAlbums.push(album);
      }
    });
  };
  FillArray();
  const CheckGenres = () => {
    HeardAlbums.map((album) => {
      AllGenres.map((genre) => {
        if (genre.genre.toLowerCase() == album.Genre.toLowerCase()) {
          genre.counter++;
        }
      });
    });
  };
  CheckGenres();

  return (
    <>
      <BrowserRouter>
        {!isError ? (
          <Header
            name={UserLoggedIn}
            data={SQLData}
            setUserLoggedIn={setUserLoggedIn}
          />
        ) : (
          <div></div>
        )}
        <Background />
        <Routes>
          <Route
            path="/home"
            element={
              <Home
                AlbumData={SQLData}
                user={UserLoggedIn}
                GenreArray={HeardAlbums}
                GlobalData={GlobalData}
              />
            }
          />
          <Route
            path="/login"
            element={<Login setLoggedIn={setUserLoggedIn} />}
          />
          <Route
            path="/stats"
            element={
              <Stats
                data={SQLData}
                heard={HeardAlbums}
                Genres={AllGenres}
                globalData={GlobalData}
              />
            }
          />
          <Route
            path="*"
            element={<Error error={isError} user={UserLoggedIn} />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
