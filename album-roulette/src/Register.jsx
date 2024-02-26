import { useState, useEffect } from "react";
import axios from 'axios'

export default function RegisterNew(){
    const [usernameReg, setusernameReg] = useState("")
    const [PasswordReg, setPasswordReg] = useState("")
    const [matchPassword, setMatchPassword] = useState("")
    let [IsMatching, setIsMatching]= useState(true)
    let [IsAvailable, setIsAvailable] = useState(true);

    const hash = () =>{

    }
    const register = () => {
        axios.post('http://localhost:5174/api/post/register', {
        
            username: usernameReg, 
            password: PasswordReg,
            
        }).then((response) => {
            console.log(response)
        })
    }

    const CheckUsername = async (name) => {
            const response = await axios.get(`http://localhost:5174/api/get/username/${name}`);
            for (let i = 0; i < response.data.recordset.length; i++) {
                if (response.data.recordset[i].Username.toLowerCase() === name.toLowerCase()) {
        
                    return false;
                    
                } else {
                    
                    return true;
                }
            }

            return true;
    }
    const CheckPassword = () =>{
        if(PasswordReg.toLowerCase() == matchPassword.toLowerCase()){
            
            return true
        }
        else{
        
            return false
        }
    }

    const wrapper = async (e) => {
        e.preventDefault();
        
            var noe = await CheckUsername(usernameReg);
            var noe2 = await CheckPassword();
                if(noe && noe2){
                    console.log("Kjør registrering")
                    
                    register();
                }
                else {
                    console.log("feiler")
                }
            
        }
    return (
        <>
        <div className="flex items-center justify-center">
            <div className="flex flex-col items-center justify-center h-72 w-72 mt-12 border-solid border-2">
                <form className="flex flex-col" >
                    <label >Username:</label> <input type="username" onChange={(e) => {setusernameReg(e.target.value)}}/>
                    {IsAvailable? <></> : <p className="text-red-600">{usernameReg} already exists</p>}
                    <label>Password:</label><input type="password" onChange={(e) => {setPasswordReg(e.target.value)}} />
                    <label>Repeat password: </label><input type="password" onChange={(e) => {setMatchPassword(e.target.value)}}/>
                    {IsMatching ? <></> : <p className="text-red-600">Password do not match!</p>}
                    <button onClick={wrapper}>Submit</button>
                    <button onClick={wrapper}>Testknapp</button>
                </form>
            </div>
        </div>
        </>
    )
}