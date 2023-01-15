import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import "./sidebar.css"

const SideBar = () => {
 
  const [cats,setCats]=useState([])

   useEffect(()=>{
    const getCats=async()=>{
      const res=await axios.get("/categories")
      setCats(res.data)
    }
      getCats()
   },[])
  return (
    <div className='sidebar'>
    <div className='sidebarItem'>
    <span className='sidebarTitle'>CATEGORIES</span>
    <ul className='sidebarList'>
    {cats.map(c=>(
      <Link to={`/?cat=${c.name}`} className="link"> <li className='sidebarListItem'>{c.name}</li></Link>))}
    
    

    </ul>
    </div>
    </div>
  )
}

export default SideBar