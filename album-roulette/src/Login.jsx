import { useState } from "react"
import RegisterNew from "./Register"

export default function Login({setLoggedIn}){
    const [NewUser, setNewUser] = useState(false)

    const HandleRegister = () =>{
        setNewUser(true)
    }
    return (
        <>
            {!NewUser ?
            <div className="flex items-center justify-center">
                <div className="flex flex-col items-center justify-center h-72 w-72 mt-12 border-solid border-2">
                    <form className="flex flex-col">
                        <label>Username:</label> <input type="text" />
                        <label>Password:</label><input type="password" />
                        <button onClick={HandleRegister}>New User?</button>
                        <button onClick={setLoggedIn}>Submit</button>
                    </form>
                </div>
            </div>
            : <RegisterNew logged={setLoggedIn} /> }
        </>
    )
}