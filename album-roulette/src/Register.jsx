import { useState, useEffect } from "react";
import axios from 'axios'

export default function RegisterNew({logged}){
    const [users, setUsers] = useState()

    useEffect(() => {
        axios.get("http://localhost:5174/api/get/users").then((data)=>{
            setUsers(data.data.recordset)  
        });
    }, [])
    console.log(users)
    return (
        <>
        <div className="flex items-center justify-center">
            <div className="flex flex-col items-center justify-center h-72 w-72 mt-12 border-solid border-2">
                <form className="flex flex-col">
                    <label>Username:</label> <input type="text" />
                    <label>Password:</label><input type="password" />
                    <label>Repeat password: </label><input type="password" />
                    <button onClick={logged}>Submit</button>
                </form>
            </div>
        </div>
        </>
    )
}