import { useState} from "react";
import axios from 'axios'
import {createHash } from 'crypto'


export default function RegisterNew(){
    const [IsAvailable, setIsAvailable] = useState(true);

    const [userState, setUserState] = useState({
        username:"",
        password: "",
        confirmPassword: "",

    })


    const handleChange = (e) =>{
        e.preventDefault();
        const {name, value} = e.target;
        setUserState((values) => ({
            ...values,
            [name] : value
        }))
        setIsAvailable(true)
    }

    
  
    const hashpassword = (string) =>{
        return createHash('sha256').update(string).digest('hex');
    }


    const register = () => {
        axios.post('http://localhost:5174/api/post/register', {
        
            username: userState.username, 
            password: hashpassword(userState.password),
            
        }).then((response) => {
            console.log(response)
        })
    }

    const CheckUsername = async (name) => {
            const response = await axios.get(`http://localhost:5174/api/get/username/${name}`);
            for (let i = 0; i < response.data.recordset.length; i++) {
                if (response.data.recordset[i].Username.toLowerCase() === name.toLowerCase()) {
                    setIsAvailable(false)
                    return false;
                    
                } else {
                    
                    return true;
                }
            }

            return true;
    }
    const CheckPassword = () =>{
        if(userState.password.toLowerCase() == userState.confirmPassword.toLowerCase()){
            
            return true
        }
        else{
        
            return false
        }
    }

    const wrapper = async (e) => {
        e.preventDefault();
        
            var noe = await CheckUsername(userState.username);
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
                    <label >Username:</label> 
                    <input type="username" name="username" className="border-solid border-2" onChange={handleChange}/>

                    {IsAvailable? <></> : <p className="text-red-600">{userState.username} already exists</p>}

                    <label>Password:</label>
                    <input name="password" className="border-solid border-2" type="password" onChange={handleChange} />

                    <label>Repeat password: </label>
                    <input name="confirmPassword" className="border-solid border-2" type="password" onChange={handleChange}/>

                    {userState.password.toLowerCase() == userState.confirmPassword.toLowerCase()? <></> : <p className="text-red-600">Password do not match!</p>}

                    <button onClick={wrapper}>Register</button>
                </form>
            </div>
        </div>
        </>
    )
}