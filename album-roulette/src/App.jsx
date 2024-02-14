import { useEffect, useState } from 'react'
import './App.css'
import Header from './Header'
import SpotifyLogin from './SpotifyLogin'
import axios from 'axios'




function App() {
  const [test, setTest] = useState(() =>[]);

    useEffect(()=>{
        axios.get("http://localhost:5174/").then((data)=>{
            setTest(data.data.recordset)
        
        });
    }, [])
  return (
    <>
    <Header/>
      <SpotifyLogin AlbumData={test} />
      
    </>
  )
}

export default App
