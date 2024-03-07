import {useState} from 'react'


export default function Dropdown({data}){
    const [open, SetOpen] = useState(false);

    const handleOpen = () =>{
        SetOpen(!open);
 
    }
    
    const GenreArray = []
    const FillArray = () => {
        data.map((album) => {
            if (album.Is_Heard == 1){
                GenreArray.push(album.Genre)
            }
        })
    }
    FillArray();
    console.log(GenreArray)
    return(
        <div>
            <button className='self-center text-1xl font-semibold whitespace-nowrap dark:text-white relative ' onClick={handleOpen}>
                Genre statistics
            </button>
            {open ? 
            <div>
                <ul className='absolute bg-white w-32 bg-opacity-90'>
                  <li>test1</li>
                  <li>test2</li>
                  <li>test3</li>
                </ul>
            </div>
                : <div></div>}
        </div>
    )
}