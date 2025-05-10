import React from 'react'
import  { useEffect, useState } from 'react'
import { useParams, useSearchParams } from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"




const ViewPaste = () => {
  const {id}=useParams();
  const allPastes=useSelector((state)=>state.paste.pastes);
  const paste=allPastes.filter((p)=>p._id===id)[0];
  return (
    <div>
      <div className='flex flex-row gap-7 place-content-between'>
        <input
          className='p-1 rounded-md bg-black w-[66%] pl-4'
          type="text" placeholder='Enter Title' value={paste.title} onChange={(e) => setTitle(e.target.value)}  disabled/>
        
      </div>
      <div className='mt-8'>
        <textarea className='rounded-2xl mt-4 min-w-[500px] h-[600px] p-4 bg-black'
          value={paste.content}
          disabled
          placeholder='enter content here'
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
      </div>
  )
}

export default ViewPaste