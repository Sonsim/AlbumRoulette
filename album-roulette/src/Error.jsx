import Home from './Home'
import Login from './Login'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

export default function Error ({ error,user}) {
    const navigate = useNavigate()

    const backToLogin = () => {
        if(!user){
        navigate("/login")
        error = false;
        }
        else{
            navigate("/home")
        error = false;
        }
    }
    error = true;
    return (
        <>
        <div className="flex items-center justify-center">
            <div className="flex flex-col items-center justify-center h-72 w-72 mt-12 border-solid border-2" >
                <h1 className='text-8xl font-extrabold text-black tracking-widest'>404</h1>
                <div>Page not found</div>
                <button className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700  h-8 w-20' onClick={backToLogin}> Back</button>
            </div>
            </div>
        </>
    )
}