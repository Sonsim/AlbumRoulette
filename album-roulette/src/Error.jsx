import Home from './Home'
import Login from './Login'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

export default function Error ({ error}) {
    const navigate = useNavigate()

    const backToLogin = () => {
        navigate("/login")
        error = false;
    }
    error = true;
    return (
        <>
        <div className="flex items-center justify-center">
            <div className="flex flex-col items-center justify-center h-72 w-72 mt-12 border-solid border-2" >
                <h1>404</h1>
                <div>Page not found</div>
                <button onClick={backToLogin}> Back to Login</button>
            </div>
            </div>
        </>
    )
}