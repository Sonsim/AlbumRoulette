import {useState, useEffect} from 'react'
import SpotifyPlayer from 'react-spotify-web-playback'


export default function Player({accesstoken, albumUri}){

    
    return(
        <>
           <SpotifyPlayer 
           token = {accesstoken}
           showSaveIcon
           initialVolume={20}
           layout='responsive'
           uris={albumUri ? [albumUri] : []}
        />
        </>
    ) 
}