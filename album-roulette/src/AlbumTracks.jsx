import { useState, useEffect } from "react";
import axios from "axios";

export default function AlbumTracks({ accessToken, albumID }) {
  const [songs, setSongs] = useState([]);

  const GetTracks = async () => {
    if (!albumID) {
      console.log("Album ID missing");
      return;
    }
    try {
      const { data } = await axios.get(
        `https://api.spotify.com/v1/albums/${albumID}/tracks`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          params: {
            limit: 40,
          },
        }
      );
      setSongs(data.items);
    } catch (error) {
      console.error("Error getting tracks:", error);
    }
  };
  useEffect(() => {
    if (songs.length < 1) {
      GetTracks();
    }
  }, [songs]);
  const ShowTracks = songs.map((song) => <li key={song.id}>{song.name} </li>);

  return (
    <>
      {songs.length > 0 ? (
        <ul className="">{ShowTracks}</ul>
      ) : (
        <div className="">Track data unvailable</div>
      )}
    </>
  );
}
