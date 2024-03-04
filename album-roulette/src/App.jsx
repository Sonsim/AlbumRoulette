import { useEffect, useState } from 'react'
import './App.css'
import Header from './Header'
import SpotifyLogin from './SpotifyLogin'
import axios from 'axios'
import Login from './Login'
import {BrowserRouter, Routes, Route} from 'react-router-dom'


function App() {
  const [SQLData, setSQLData] = useState([]);
  const [UserLoggedIn, setUserLoggedIn] = useState("")
  const [token, setToken] = useState("");
    useEffect(()=>{
        axios.get("http://localhost:5174/api/get/albums").then((data)=>{
            setSQLData(data.data.recordset)
        
        });
    }, [])

function handleLoggedin(user){
  if(user){
    setUserLoggedIn(user)
  }
}
function handleLogOut() {
  setUserLoggedIn("");
}
  return (
    <>
   {UserLoggedIn != ""? 
      <><Header data={SQLData} SetLogged={handleLogOut} name={UserLoggedIn} /><SpotifyLogin AlbumData={SQLData} token={token} setToken={setToken} /></>
   : <Login setLoggedIn={handleLoggedin} />} 
      
  </>
  )
}

export default App
