import { useState, useEffect } from "react";
import SpotifyPlayer from "react-spotify-web-playback";

export default function Player({ accesstoken, albumUri }) {
  return (
    <>
      <SpotifyPlayer
        token={accesstoken}
        showSaveIcon
        initialVolume={20}
        layout="responsive"
        styles={{
          bgColor: "#333",
          color: "#fff",
          loaderColor: "#fff",
          sliderColor: "#1cb954",
          savedColor: "#fff",
          trackArtistColor: "#ccc",
          trackNameColor: "#fff",
        }}
        uris={albumUri ? [albumUri] : []}
      />
    </>
  );
}
