import SpotifyLogin from "./SpotifyLogin";
import { useNavigate, Link } from "react-router-dom";



export default function Home({AlbumData, token, setToken, user}) {
    const navigate = useNavigate();
    return (
        <>
            {user ? 
            <SpotifyLogin AlbumData={AlbumData} token={token} setToken={setToken} /> : 
            <div className="flex items-center justify-center">
            <div className="flex flex-col items-center justify-center h-72 w-72 mt-12 border-solid border-2">
                Please log in or register new user
                <Link to="/login">To Login page</Link>
            </div>
            </div>
}
        </>
    )
}