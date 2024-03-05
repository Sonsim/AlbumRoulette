import SpotifyContent from "./SpotifyContent";
import SpotifyLogin from "./SpotifyLogin";
import AlbumTracks from "./AlbumTracks";
import Player from "./Player";


export default function Home({AlbumData, token, setToken}) {
    return (
        <>
            <SpotifyLogin AlbumData={AlbumData} token={token} setToken={setToken} />

        </>
    )
}