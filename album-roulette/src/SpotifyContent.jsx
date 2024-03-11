import Player from "./Player";
import AlbumTracks from "./AlbumTracks";
import Rating from "./Rating";
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
  GenreArray,
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
      setIsFinished(false);
    }
  };
  return (
    <>
      <div className="flex flex-row bg-black h-screen">
        {!token ? (
          <a
            className="text-white ml-5"
            href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${SCOPES.join(
              "%20"
            )}&response_type=${RESPONSE_TYPE}`}
          >
            Log in with Spotify
          </a>
        ) : (
          <>
            <div className="flex-col flex w-1/4">
              <button
                onClick={logout}
                className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 w-48 ml-5 my-1"
              >
                Log out of Spotify
              </button>
              <button
                onClick={WrapperFunction}
                className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 w-48  ml-5"
              >
                Get random album
              </button>
            </div>

            <div>
              <div className=" flex flex-col items-center">
                <h3 className="text-xl font-extrabold text-white">
                  Album from the "1001 Albums You Must Hear Before You Die"
                </h3>
                <ul>
                  <li className="text-white">{`Artist: ${selectedAlbum?.Artist}`}</li>
                  <li className="text-white">{`Album: ${selectedAlbum?.Title}`}</li>
                </ul>
              </div>
              {albums[0] != undefined &&
              albums[0].artists[0].name == selectedAlbum.Artist ? (
                <>
                  <div className="flex flex-row">
                    <div className="flex flex-col ">
                      {albums.length > 0 && (
                        <img
                          className="object-scale-down"
                          src={albums[0].images[0].url}
                        />
                      )}

                      {albums.length > 0 && (
                        <Player accesstoken={token} albumUri={albums[0].uri} />
                      )}
                    </div>

                    <div>
                      <div className="w-96 h-96 flex flew-col justify-center overflow-auto ml-6">
                        {albums.length > 0 && (
                          <AlbumTracks
                            accessToken={token}
                            albumID={albums[0].id}
                          />
                        )}
                      </div>
                      <button
                        className="ml-20 inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 h-12 mt-4"
                        onClick={OpenBox}
                      >
                        Finished listening?
                      </button>
                      {isFinished ? (
                        <div className="flex flex-col ml-16 text-white">
                          <label>What score would you give the album?</label>
                          {/*<Rating /> */}{" "}
                          <input
                            className="text-black"
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
                            className="ml-20 inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 h-8 w-20"
                            onClick={AlbumHeard}
                          >
                            Submit
                          </button>
                        </div>
                      ) : (
                        <p className="hidden"></p>
                      )}
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
