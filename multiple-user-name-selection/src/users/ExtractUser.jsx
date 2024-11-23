import React, {useState, useEffect} from 'react'
import * as styles from "./ExtractUser.module.css"

function ExtractUser() {
    const [data,setData] = useState([])
    const [isLoaded,setIsLoaded] = useState(false)
    const [error,setIsError] = useState(false)
    const [nameList,setNameList] = useState([])
    const [isSelected,setSelected] = useState([])

    useEffect(()=>{
        fetch('https://dummyapi.online/api/users').then((res)=> res.json()).then((result)=>{
            setIsLoaded(true)
            setData(result)
        },
    (error)=> {
        setIsError(true)
    })
    },[])

    useEffect(()=>{
        let names = [...data]
        names = names.map((ele)=> {
            return ele.name
        })
        setNameList(names)
        setSelected(Array(names.length).fill(false))
    },[data])

    function changeSelection(index) {
        let element = [...isSelected]
        element[index] = !element[index]
        setSelected(element)
    }

  return (
    <div>
        {isLoaded && 
        <ul>
    { nameList.map((element,index)=> 
         <li className={`${styles.selected} ${isSelected[index] ? "" : styles.not}`} 
         onClick={()=> changeSelection(index)} key={index}>{element}</li>
        )}    
        </ul>}
        {error && <p>Something went Wrong!</p>}
    </div>
  )
}

export default ExtractUser