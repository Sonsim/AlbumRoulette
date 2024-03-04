import React from 'react'
import { useEffect, useState } from 'react'
import vinyl from './assets/vinyl.png'
import './App.css'
import Dropdown from './Dropdown'

export default function Header({data, SetLogged, name}){
    return (
        <nav className="bg-white border-gray-200 dark:bg-gray-700">
            <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4'>
                <img src={vinyl} alt="ingen logo" width="75px"className="mb-4"></img>
                <h1 className="self-center text-4xl font-semibold whitespace-nowrap dark:text-white">Welcome {name}</h1>:
                <Dropdown data={data} />
                <button className="self-center text-1xl font-semibold whitespace-nowrap dark:text-white">Placeholder 2</button>
                <button onClick={SetLogged} className="self-center text-1xl font-semibold whitespace-nowrap dark:text-white">Log Out</button>
            </div>
        </nav>
    )
}