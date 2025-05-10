import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { removeFromPaste } from '../features/pasteSlice';
import toast from 'react-hot-toast';
import { NavLink } from 'react-router-dom';
import { Pencil, Eye, Trash2, Copy, Share2 } from "lucide-react";



const Paste = () => {

  const pastes = useSelector((state) => state.paste.pastes);
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();
  const filteredData = pastes.filter((paste) => paste.title.toLowerCase().includes(searchTerm.toLowerCase()))
  function handleDelete(pasteId) {
    dispatch(removeFromPaste(pasteId));
  }
  function formatDate(isoDate) {
    const date = new Date(isoDate);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  }


  return (
    <div className='flex flex-col justify-center items-center'>
      <input className='p-2 rounded-2xl min-w-[600px] mt-5 mb-5 bg-black' type="search" placeholder='search here' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      <div className='flex flex-col gap-5 m-9 w-[70%]'>
        {
          filteredData.length > 0 && filteredData.map((paste) => {
            return (
              <div key={paste._id} className='border flex p-5'>
                <div className="left w-[100%]">
                  <div>
                    {paste.title}
                  </div>
                  <div>
                    {paste.content}
                  </div>
                </div>
                <div className='flex flex-col gap-8'>
                  <div className='flex flex-row gap-4 place-content-evenly   text-white'>
                    <button >
                      <NavLink to={`/?pasteId=${paste?._id}`} ><Pencil className="w-5 h-5 text-white hover:text-purple-600 cursor-pointer" title="Edit" /></NavLink>
                    </button>
                    <button ><NavLink to={`/pastes/${paste?._id}`} className='text-white'><Eye className="w-5 h-5 text-white hover:text-purple-600 cursor-pointer" title="View" /></NavLink></button>
                    <button onClick={() => handleDelete(paste?._id)}> <Trash2 className="w-5 h-5 hover:text-red-600 cursor-pointer" title="Delete" /></button>
                    <button onClick={() => {
                      navigator.clipboard.writeText(paste?.content)
                      toast.success("Copied to clipboard")

                    }}><Copy className="w-5 h-5 hover:text-indigo-600 cursor-pointer" title="Copy" /></button>
                    <button onClick={() => {
                      const shareURL = `${window.location.origin}/pastes/${paste._id}`;
                      navigator.clipboard.writeText(shareURL)
                        .then(() => toast.success("Share link copied to clipboard!"))
                        .catch(() => toast.error("Failed to copy share link"));
                    }}><Share2 className="w-5 h-5 hover:text-green-600 cursor-pointer" title="Share" /></button>
                  </div>
                  <div className='flex  justify-end'>
                    {formatDate(paste.createdAt)}
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default Paste