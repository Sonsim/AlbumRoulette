import { useEffect, useState } from "react";
import axios from 'axios'
export default function AlbumSearch({selectedAlbum, token, albums, setAlbums}) {
    const SearchAlbums = async () => {
   
        if (!selectedAlbum.Artist || !selectedAlbum.Title) {
          console.error('Artist or title is missing');
          return;
        }
      
        try {
          const { data } = await axios.get("https://api.spotify.com/v1/search", {
            headers: {
              Authorization: `Bearer ${token}`
            },
            params: {
              q: ` ${selectedAlbum.Title} ${selectedAlbum.Artist}`,
              type: "album",
              limit:  1
            }
          });
          // Sets Albums to the object found by searching Spotify
          setAlbums(data.albums.items);
        } catch (error) {
          console.error('Error searching albums:', error);
        }
      };
    
      useEffect(() => {
        if (selectedAlbum) {
          SearchAlbums();
          
        }
      }, [selectedAlbum]);
      
    }