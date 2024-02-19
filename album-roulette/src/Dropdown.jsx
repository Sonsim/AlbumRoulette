import {useState, useEffect} from 'react'


export default function Dropdown({data}){
    const [open, SetOpen] = useState(false);

    const handleOpen = () =>{
        SetOpen(!open);
 
    }
    
   const Genrelist = data.data.map(album => <li key={album.ID}>{album.Genre}</li>)
    return(
        <div>
            <button className='self-center text-1xl font-semibold whitespace-nowrap dark:text-white relative ' onClick={handleOpen}>
                Genre statistics
            </button>
            {open ? 
            <div>
                <ul className='absolute bg-white w-32 bg-opacity-90'>
                  {Genrelist}
                </ul>
            </div>
                : <div></div>
}
        </div>
    )
}