import { useEffect, useState } from 'react'
import './App.css'
import Header from './Header'
import axios from 'axios'
import Login from './Login'
import {BrowserRouter, Routes, Route, useNavigate} from 'react-router-dom'
import Home from './Home'
import Error from './Error'



function App() {
  const [SQLData, setSQLData] = useState([]);
  const [UserLoggedIn, setUserLoggedIn] = useState()
  let isError = false;

    useEffect(()=>{
        let userID = localStorage.getItem("userID")
        let name = "User" +userID
        if(userID != null){
        axios.get(`http://localhost:5174/api/get/albums/${name}`).then((data)=>{
            setSQLData(data.data.recordset)
        });
        }
    }, [])

    useEffect(() => {
      const loggedInUser = localStorage.getItem("user");
      if (loggedInUser) {
        const foundUser = loggedInUser;
        setUserLoggedIn(foundUser);
      }
    }, []);

  return (
    <>
      <BrowserRouter>
	            {!isError?<Header name={UserLoggedIn} data={SQLData} setUserLoggedIn={setUserLoggedIn} /> : <div></div>} 
	              <Routes>
		                <Route path="/home" element={<Home AlbumData={SQLData} user={UserLoggedIn}/>} /> 
		                <Route path="/login" element={ <Login setLoggedIn={setUserLoggedIn}/>} />
		                <Route path='*' element={<Error error={isError}/>}/>
	              </Routes>
      </BrowserRouter> 
      
  </>
  )
}

export default App
