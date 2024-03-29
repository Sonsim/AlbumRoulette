import Player from "./Player";
import AlbumTracks from "./AlbumTracks";
import Background from "../Background";
import { useState } from "react";
import axios from "axios";

export default function SpotifyContent({
  AUTH_ENDPOINT,
  CLIENT_ID,
  REDIRECT_URI,
  SCOPES,
  RESPONSE_TYPE,
  logout,
  WrapperFunction,
  selectedAlbum,
  albums,
  token,
  userID,
}) {
  const [isFinished, setIsFinished] = useState(false);
  const [score, setScore] = useState();
  const [isScored, setIsScored] = useState(false);

  const OpenBox = () => {
    if (isFinished) {
      setIsFinished(false);
    } else {
      setIsFinished(true);
    }
  };
  const handleScoreChange = (e) => {
    e.preventDefault();
    const score = e.target.value;
    setScore(score);
    setIsScored(true);
  };
  const AlbumHeard = () => {
    if (isScored) {
      axios.post(`http://localhost:5174/api/post/album_heard`, {
        album: selectedAlbum.Title,
        table: userID,
      });
      axios.post(`http://localhost:5174/api/post/setscore`, {
        album: selectedAlbum.Title,
        table: userID,
        score: score,
      });
      axios.post(`http://localhost:5174/api/post/globalscore`, {
        album: selectedAlbum.Title,
        score: score,
      });
      axios.post(`http://localhost:5174/api/post/globalheard`, {
        album: selectedAlbum.Title,
        value: 1,
      });
      WrapperFunction();
      setIsFinished(false);
    }
  };
  return (
    <>
      <div className="flex flex-col  justify-center  md:justify-normal overflow-hidden sm:flex-col md:flex-row lg:flex-row  object-fit relative z-30 ">
        {!token ? (
          <a
            className="ml-5 mt-6"
            href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${SCOPES.join(
              "%20"
            )}&response_type=${RESPONSE_TYPE}`}
          >
            <button className="bg-green-500 rounded-full text-sm font-semibold text-gray-700 mr-2 mb-2 w-32 md:w-48 ml-5 my-1 hover:bg-green-700">
              Log in with Spotify
            </button>
          </a>
        ) : (
          <>
            <div className="flex-col flex w-1/6 h-1/6 mt-6 ml-10">
              <button
                onClick={logout}
                className="inline-block bg-green-500 rounded-full px-3 py-1 text-sm  font-semibold text-gray-700 mr-2 mb-2 w-48 ml-5 my-1 hover:bg-green-700"
              >
                Log out of Spotify
              </button>
              <button
                onClick={WrapperFunction}
                className="inline-block bg-green-500 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 w-48  ml-5 hover:bg-green-700"
              >
                Get random album
              </button>
              <button
                className="inline-block bg-green-500 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 w-48  ml-5 hover:bg-green-700"
                onClick={OpenBox}
              >
                Finished listening?
              </button>
              {isFinished ? (
                <div className="flex flex-col ml-4 bg-white rounded-lg text-xs w-52 md:text-base md:w-80 items-center">
                  <label>What score would you give the album?</label>

                  <input
                    name="score"
                    type="number"
                    max={10}
                    min={1}
                    onChange={handleScoreChange}
                  />
                  {!isScored ? (
                    <span>Please write a score before submitting</span>
                  ) : (
                    <span></span>
                  )}
                  <button
                    className="inline-block bg-green-500 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 h-8 w-18 h-18 text-sm hover:bg-green-700"
                    onClick={AlbumHeard}
                  >
                    Submit
                  </button>
                </div>
              ) : (
                <p className="hidden"></p>
              )}
            </div>

            <div className="mt-6 flex flex-col">
              {albums[0] != undefined &&
              albums[0].artists[0].name.toLowerCase() ==
                selectedAlbum.Artist.toLowerCase() ? (
                <>
                  <div className="flex flex-row md:mt-0 sm:flex-col md:flex-row lg:flex-row w-auto">
                    <div className="flex flex-col ">
                      {albums.length > 0 && (
                        <img
                          className=" ml-14 w-2/3 md:w-full md:ml-28"
                          src={albums[0].images[0].url}
                        />
                      )}

                      {albums.length > 0 && (
                        <Player accesstoken={token} albumUri={albums[0].uri} />
                      )}
                    </div>

                    <div>
                      <div className="hidden md:block md:w-80 h-96 flex flew-col overflow-auto ml-40 bg-green-500 content-center rounded-lg">
                        <h4 className="font-bold">Track list</h4>
                        {albums.length > 0 && (
                          <AlbumTracks
                            accessToken={token}
                            albumID={albums[0].id}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div>
                  <h2 className="text-xl font-bold dark: black">
                    {" "}
                    {selectedAlbum.Title == ""
                      ? ` `
                      : ` ${selectedAlbum.Title} by ${selectedAlbum.Artist} is not on Spotify. Check your local record store!`}
                  </h2>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
}
