import { useEffect, useState } from 'react'
import './App.css'
import Header from './Header'
import SpotifyLogin from './SpotifyLogin'
import axios from 'axios'
import Login from './Login'
import Register from './Register'



function App() {
  const [SQLData, setSQLData] = useState(() =>[]);
  const [IsLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(()=>{
        axios.get("http://localhost:5174/api/get/albums").then((data)=>{
            setSQLData(data.data.recordset)
        
        });
    }, [])

function handleLoggedin(){
  if(IsLoggedIn == true){
    setIsLoggedIn(false)
  }
  else setIsLoggedIn(true)
}
  return (
    <>

     <Register /> 
   {/* {IsLoggedIn ? 
      <><Header data={SQLData} SetLogged={handleLoggedin}/><SpotifyLogin AlbumData={SQLData} /></>
   : <Login setLoggedIn={handleLoggedin} />} */}
      
  </>
  )
}

export default App
