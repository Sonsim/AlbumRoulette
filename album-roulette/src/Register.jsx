import { useState} from "react";
import axios from 'axios'
import {createHash } from 'crypto'


export default function RegisterNew({hashFunction}){
    // Boolean to track if username is available or not
    const [IsAvailable, setIsAvailable] = useState(true);
    // Message displayed to user if password is valid or invalid
    const [passwordMessage, setPasswordMessage] = useState("");
    // Statevariable used to store the username, password and confirmed password
    const [userState, setUserState] = useState({
        username:"",
        password: "",
        confirmPassword: "",

    })
    // function to validate the users password against regex(password must be minimum eight characters and contain one capital letter, one special character, one small letter and one number )
    const validatePassword = () => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if(userState.password == ""){
            setPasswordMessage("Please enter password")
            return false;
        }
        else if(passwordRegex.test(userState.password)){
            setPasswordMessage("Password is vaild")
            return true;
        }
        else if (!passwordRegex.test(userState.password)){
            setPasswordMessage("Password is invalid")
            return false;
        }
    }
    // function to take the userinputs and add them to userState variable
    const handleChange = (e) =>{
        e.preventDefault();
        const {name, value} = e.target;
        setUserState((values) => ({
            ...values,
            [name] : value
        }))
        setIsAvailable(true)
        validatePassword();
    }
    const hashpassword = (string) =>{
        return createHash('sha256').update(string).digest('hex');
    }
    
 
    //Sends the userinformation to the database and inserts the data into a specific table
    const register = () => {
        axios.post('http://localhost:5174/api/post/register', {
        
            username: userState.username, 
            password: hashpassword(userState.password),
            
        }).then(() => {
            console.log("Registrert!")
        })
        
    }
    //Searches the database for a match to the userinputs. Returns false if it finds a match and true if nothing is found
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
    //checcks if the two different passwordinputs matches eachothter or not. Returs true if match, false if no match
    const CheckPassword = () =>{
        if(userState.password == userState.confirmPassword){
            
            return true
        }
        else{
        
            return false
        }
    }
    //runs all other functions when button is clicked. Waits for the result of CheckUsername, ChechPassword, and validatePassword before running register() if the right conditions is matched.
    const wrapper = async (e) => {
        e.preventDefault();
        
            var usernameCheck = await CheckUsername(userState.username);
            var passwordCheck = await CheckPassword();
            var passwordRegex = await validatePassword();
                if(usernameCheck && passwordCheck && passwordRegex){
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
                    <input name="password" className="border-solid border-2"  type="password"  onChange={handleChange} />
                    <p>{passwordMessage}</p>

                    <label>Repeat password: </label>
                    <input name="confirmPassword" className="border-solid border-2" type="password" onChange={handleChange}/>

                    {userState.password == userState.confirmPassword? <></> : <p className="text-red-600">Password do not match!</p>}

                    <button onClick={wrapper}>Register</button>
                </form>
            </div>
        </div>
        </>
    )
}