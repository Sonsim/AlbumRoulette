import { useState } from "react"
import RegisterNew from "./Register"
import axios from 'axios'
import {createHash } from 'crypto'
import { useNavigate } from "react-router-dom"



export default function Login({setLoggedIn}){
    const navigate = useNavigate()
    const [NewUser, setNewUser] = useState(false);
    const [userInfo, setUserInfo] = useState({
        username: "",
        password: ""
    })
    const [IsInvalid, setIsInvalid] = useState(false)
    const handleChange = (e) => {
        e.preventDefault();
        const {name, value} = e.target;
        setUserInfo((values) => ({
            ...values,
            [name] : value
        }))
    }
    const Login = (e) => {
        
        e.preventDefault();
        axios.post('http://localhost:5174/api/get/user-login', {
            
            user: userInfo.username,
            pass: hashpassword(userInfo.password),
            
        }).then(response => {
            if(response.data.recordset.length >0 && response.data.recordset.length < 2){
                setLoggedIn(response.data.recordset[0].Username)
                localStorage.setItem('user', response.data.recordset[0].Username);
                localStorage.setItem('userID', response.data.recordset[0].UserId)
                navigate('/home')
            }
            else {
                console.log("Får ingen token")
                setIsInvalid(true)
            }
        })
        
    }
    const HandleRegister = () =>{
        setNewUser(true)
    }
    // function to hash password before sending to database
    const hashpassword = (string) =>{
        return createHash('sha256').update(string).digest('hex');
    }
    
    return (
        <>
            {!NewUser ?
            <div className="flex items-center justify-center">
                <div className="flex flex-col items-center justify-center h-72 w-72 mt-12 border-solid border-2">
                    <form className="flex flex-col">
                        <label>Username:</label> <input name="username" type="text" onChange={handleChange} />
                        <label>Password:</label><input name="password" type="password" onChange={handleChange}/>
                        {IsInvalid? <p className="text-red-600">Invalid Username or Password</p> :  <p></p>}
                        <button onClick={HandleRegister}>New User?</button>
                        <button onClick={Login}>Submit</button>
                    </form>
                </div>
            </div>
            : <RegisterNew hashFunction={hashpassword} setLogg={setLoggedIn}/> }
        </>
    )
}