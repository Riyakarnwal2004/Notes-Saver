import React, { useEffect, useState } from 'react'
import { useSearchParams } from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import { addToPaste, updateToPaste } from '../features/pasteSlice';



const Home = () => {
  const [title, setTitle] = useState('');
  const [value, setValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");
  const dispatch=useDispatch();
  const allPaste=useSelector((state)=>state.paste.pastes);
  useEffect(()=>{
      if(pasteId){
        const paste=allPaste.find((p)=>p._id===pasteId);
        setTitle(paste.title);
        setValue(paste.content);
      }
      
     },[pasteId])
  function createPaste() {
     const paste={
      title:title,
      content:value,
      _id:pasteId||Date.now().toString(36),
      createdAt:new Date().toISOString(),
     }
     
     if(pasteId){
        //  update
        dispatch(updateToPaste(paste));
     }
     else{
        // create
        dispatch(addToPaste(paste));
     }
    //  after creation/updation
     setTitle('');
     setValue('');
     setSearchParams({});
  }
  return (
    <div className='w-[100%] flex flex-col items-center'>
      <div className='flex flex-row  place-content-between w-[32%]'>
        <input
          className='p-3 rounded-md bg-black  pl-4 mt-8'
          type="text" placeholder='Enter Title' value={title} onChange={(e) => setTitle(e.target.value)} />
        <button onClick={createPaste} className='w-[15rem] p-1 mt-8'>{
          pasteId ? "Update My Paste" : "Create My Paste"}
        </button>
      </div>
      <div className='mt-8'>
        <textarea className='rounded-2xl mt-7 min-w-[500px] h-[600px] p-4 bg-black'
          value={value}
          placeholder='enter content here'
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
    </div>
  )
}

export default Home