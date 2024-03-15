import React, { useState, useEffect } from "react";
import SpotifyContent from "./SpotifyContent";
import AlbumSearch from "./AlbumSearch";
import axios from "axios";

export default function SpotifyLogin({ AlbumData, GenreArray }) {
  {
    /*Variables used to set the authentication url */
  }
  const CLIENT_ID = "76c35aaf7270460788d6f737af45e6b5";
  const REDIRECT_URI = "http://localhost:5173/home";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";
  const SCOPES = [
    "user-read-currently-playing",
    "user-read-email",
    "user-read-private",
    "user-library-modify",
    "user-read-playback-state",
    "streaming",
    "user-library-read",
    "user-modify-playback-state",
    "app-remote-control",
    "user-follow-read",
    "user-follow-modify",
    "user-read-playback-position",
  ];

  const userID = "User" + localStorage.getItem("userID");

  {
    /*State variable keeping track of the accesstoken needed to use the Spotify Api */
  }
  const [token, setToken] = useState("");
  {
    /*State variable keeping track of the albums returned by the Spotify Api on search */
  }
  const [albums, setAlbums] = useState([]);
  {
    /*State varible keeping track of the random album generated from the database */
  }
  const [selectedAlbum, setSelectedAlbum] = useState({
    Title: "",
    Artist: "",
    Genre: "",
    Is_Heard: false,
    Number_of_Songs: 0,
    Release_Year: 0,
  });

  // Storing access token from Spotify
  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");

    if (!token && hash) {
      token = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        .split("=")[1];
      import.meta.env.VITE_SPOTIFY_ACCESS_TOKEN = token;
      window.location.hash = "";
      window.localStorage.setItem("token", token);
    }

    setToken(token);
  }, []);

  // Log out of Spotify and delete the access token
  const logout = () => {
    setToken("");
    window.localStorage.removeItem("token");
  };
  const WrapperFunction = () => {
    const AlbumArray = [];
    //Goes through the database and pushes objects with Is_Heard = 0 into AlbumArray
    AlbumData.map((album) => {
      if (album.Is_Heard != 1) {
        AlbumArray.push(album);
      }
    });
    console.log(albums);
    // Gets Random album from AlbumArray
    const rndAlbum = AlbumArray[Math.floor(Math.random() * AlbumArray.length)];
    // Sets the selectedAlbum variable to the same as the random album
    setSelectedAlbum(rndAlbum);
  };

  return (
    <>
      <AlbumSearch
        selectedAlbum={selectedAlbum}
        token={token}
        albums={albums}
        setAlbums={setAlbums}
      />
      <SpotifyContent
        AUTH_ENDPOINT={AUTH_ENDPOINT}
        CLIENT_ID={CLIENT_ID}
        REDIRECT_URI={REDIRECT_URI}
        SCOPES={SCOPES}
        RESPONSE_TYPE={RESPONSE_TYPE}
        WrapperFunction={WrapperFunction}
        selectedAlbum={selectedAlbum}
        albums={albums}
        token={token}
        logout={logout}
        userID={userID}
        GenreArray={GenreArray}
      />
    </>
  );
}
