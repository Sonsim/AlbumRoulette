import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Player from './Player';
import AlbumTracks from './AlbumTracks';

export default function SpotifyLogin({AlbumData}) {
    {/*Variables used to set the authentication url */}
  const CLIENT_ID = "76c35aaf7270460788d6f737af45e6b5";
  const REDIRECT_URI = "http://localhost:5173/";
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
  
  {/*State variable keeping track of the accesstoken needed to use the Spotify Api */}
  const [token, setToken] = useState("");
  {/*State variable keeping track of the albums returned by the Spotify Api on search */}
  const [albums, setAlbums] = useState([]);
   {/*State varible keeping track of the random album generated from the json-file */}
  const [selectedAlbum, setSelectedAlbum] = useState({Title:"",Artist:""});
  

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");
    if (!token && hash) {
      token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1];
      window.location.hash = "";
      window.localStorage.setItem("token", token);
    }
    setToken(token);
  }, []);

  const logout = () => {
    setToken("");
    window.localStorage.removeItem("token");
  };

  const SearchAlbums = async () => {
   
    if (!selectedAlbum.Artist || !selectedAlbum.Title) {
      console.error('Artist or title is missing');
      return;
    }
  
    try {
      const { data } = await axios.get("https://api.spotify.com/v1/search", {
        headers: {
          Authorization: `Bearer ${token}`
        },
        params: {
          q: `${selectedAlbum.Artist} ${selectedAlbum.Title}`,
          type: "album",
          limit:  1
        }
      });
      setAlbums(data.albums.items);
    } catch (error) {
      console.error('Error searching albums:', error);
    }
  };

  useEffect(() => {
    if (selectedAlbum) {
      SearchAlbums();
    }
  }, [selectedAlbum]);

  const WrapperFunction = () => {
   
    const rndAlbum = AlbumData[Math.floor(Math.random() * AlbumData.length)];
    setSelectedAlbum(rndAlbum);
    console.log(selectedAlbum)
  
  };
  return (
    <div className='flex flex-row' >
      {!token ? (
        <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${SCOPES.join("%20")}&response_type=${RESPONSE_TYPE}`}>Log in with Spotify</a>
      ) : (
        <>
          <div className='flex-col flex w-1/4'> 
            <button onClick={logout} className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow w-48">Log out of Spotify</button>
            <br />
            
            <button onClick={WrapperFunction} className='bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow w-48'>Get random album</button>
          </div>
          <br />
             <div>
              <div className=' flex flex-col items-center'>
             <h3 className='text-xl font-extrabold '>Selected album from the "1001 Albums You Must Hear Before You Die"</h3>
            <ul>
                <li>{`Artist: ${selectedAlbum?.Artist}`}</li>
                <li>{`Album: ${selectedAlbum?.Title}`}</li>
            </ul>
            </div>
            {albums[0] != undefined && albums[0].artists[0].name == selectedAlbum.Artist?
            <>
            <div className='flex flex-row'>
            <div className='flex flex-col '>
                  {albums.length > 0 && <img className='object-scale-down' src={albums[0].images[0].url} />}
                
                    {albums.length > 0 && <Player accesstoken={token} albumUri={albums[0].uri} />}
                    </div>
                <div className='items-center '>
                    {albums.length > 0 && <AlbumTracks accessToken={token} albumID={albums[0].id} />} 
                </div>
                </div>
                  </>
            :  <div><h2 className='text-xl font-bold dark: black'> {selectedAlbum.Title == ""?` `:  ` ${selectedAlbum.Title} by ${selectedAlbum.Artist} is not on Spotify. Check your local record store!`}</h2></div> }
          </div> 
          
        </>
      )}
    </div>
  );
}