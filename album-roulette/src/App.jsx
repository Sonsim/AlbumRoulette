import { useEffect, useState } from 'react'
import './App.css'
import Header from './Header'
import SpotifyLogin from './SpotifyLogin'
import axios from 'axios'




function App() {
  const [SQLData, setSQLData] = useState(() =>[]);

    useEffect(()=>{
        axios.get("http://localhost:5174/api/get").then((data)=>{
            setSQLData(data.data.recordset)
        
        });
    }, [])
  return (
    <>
    <Header data={SQLData}/>
      <SpotifyLogin AlbumData={SQLData} />
      
    </>
  )
}

export default App
