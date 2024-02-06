import {useState, useEffect} from 'react'
import SpotifyPlayer from 'react-spotify-web-playback'


export default function Player({accesstoken, albumUri}){
    const [play, SetPlay] = useState(false)
    
    useEffect(() => SetPlay(true), [albumUri])
    return(
        <>
           <SpotifyPlayer 
           token = {accesstoken}
           showSaveIcon
           callback={state => {
            if(!state.isPlaying) SetPlay(false)
           }}
           play={play}
           initialVolume={20}
           uris={albumUri ? [albumUri] : []} 
           
        />
        </>
    ) 
}