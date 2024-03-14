import SpotifyLogin from "./SpotifyComponents/SpotifyLogin";
import { Link } from "react-router-dom";

export default function Home({
  AlbumData,
  token,
  setToken,
  user,
  GenreArray,
  GlobalData,
}) {
  return (
    <>
      {user ? (
        <SpotifyLogin
          AlbumData={AlbumData}
          token={token}
          setToken={setToken}
          GenreArray={GenreArray}
          GlobalData={GlobalData}
        />
      ) : (
        <div className="flex items-center justify-center z-30 relative">
          <div className="flex flex-col items-center justify-center h-72 w-72 mt-12 border-solid border-2 rounded bg-white">
            Please log in or register new user
            <button className="inline-block bg-green-500 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2  ml-5 my-1 hover:bg-green-700">
              <Link to="/login">To Login page</Link>{" "}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
