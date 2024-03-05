import { useEffect, useState } from 'react'
import './App.css'
import Header from './Header'
import axios from 'axios'
import Login from './Login'
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import Home from './Home'


function App() {
  const [SQLData, setSQLData] = useState([]);
  const [UserLoggedIn, setUserLoggedIn] = useState()
  //const [token, setToken] = useState("");
    useEffect(()=>{
        axios.get("http://localhost:5174/api/get/albums").then((data)=>{
            setSQLData(data.data.recordset)
        
        });
    }, [])
    
    useEffect(() => {
      const loggedInUser = localStorage.getItem("user");
      if (loggedInUser) {
        const foundUser = loggedInUser;
        setUserLoggedIn(foundUser);
      }
    }, []);
function handleLogOut() {
  setUserLoggedIn(null);
  localStorage.clear();
}
  return (
    <>
      <BrowserRouter>
	              <Header SetLogged={handleLogOut} name={UserLoggedIn} data={SQLData}/>
	              <Routes>
		                <Route path="/home" element={!UserLoggedIn? <Navigate replace to={"/login"} />: <Home AlbumData={SQLData}/>} /> 
		                <Route path="/login" element={UserLoggedIn? <Navigate replace to={"/home"} /> : <Login setLoggedIn={setUserLoggedIn}/>} />
		                <Route path='*' element={<Error />} />
	              </Routes>
      </BrowserRouter> 

   {/*{UserLoggedIn != ""? 
      <><Header data={SQLData} SetLogged={handleLogOut} name={UserLoggedIn} /><SpotifyLogin  /></>
   : <Login setLoggedIn={handleLoggedin} />} */}
      
  </>
  )
}

export default App
