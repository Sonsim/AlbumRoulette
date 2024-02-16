import Player from './Player'
import AlbumTracks from './AlbumTracks'

export default function SpotifyContent({AUTH_ENDPOINT, CLIENT_ID, REDIRECT_URI, SCOPES, RESPONSE_TYPE, logout, WrapperFunction, selectedAlbum, albums, token, }){

    return (
        <>
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
                <div className=' ml-6 w-96 h-96 flex flew-col justify-center overflow-auto'>
                    {albums.length > 0 && <AlbumTracks accessToken={token} albumID={albums[0].id} />} 
                </div>
                </div>
                  </>
            :  <div><h2 className='text-xl font-bold dark: black'> {selectedAlbum.Title == ""?` `:  ` ${selectedAlbum.Title} by ${selectedAlbum.Artist} is not on Spotify. Check your local record store!`}</h2></div> }
          </div> 
          
        </>
      )}
    </div>
        </>
    )
}