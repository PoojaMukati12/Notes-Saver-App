import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromPaste } from '../redux/pasteSlice'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import 'remixicon/fonts/remixicon.css'


const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes)

  const [searchTerm, setsearchTerm] = useState('')

  const dispatch = useDispatch();

  const filterData = pastes.filter(
    (paste) => paste.tittle.toLowerCase().
    includes(searchTerm.toLowerCase())
  );

  const handleclick =(pasteId)=>{
      dispatch(removeFromPaste(pasteId))
  }

  const handleShare = (content) => {
    if (navigator.share) {
      navigator
        .share({
          title: 'Check out this paste!',
          text: content, // Content to be shared
    //      url: window.location.href, // Optionally add the URL of the current page
        })
        .then(() => {
          toast.success('Content shared successfully!')
        })
        .catch((error) => {
          toast.error('Sharing failed. Please try again later.')
        })
    } else {
      // Fallback for browsers that do not support Web Share API
      toast.info('Web Share API not supported. Copy the content to share.')
    }
  }
  
  
  
  return (
    <div>
      <link href="https://cdn.jsdelivr.net/npm/remixicon@4.5.0/fonts/remixicon.css"rel="stylesheet"/> 

      <div className='w-full h-full'>
      <input className='p-2 mt-9  rounded-xl w-[1200px] border border-gray-300  outline-none '
        type='search'
        placeholder='Search Paste here...'
        value={searchTerm}
        onChange={(e) => setsearchTerm(e.target.value) }
      />
      </div>

      
        <div className='border mt-5 p-2 '>
        <h2 className='text-4xl font-bold text-left'>All Pastes </h2>
        </div>
        <div className='border p-4 ' >  
         {
              filterData.length>0 &&
              filterData.map(
                (paste)=>{
                  return(

                      <div
                         className="border border-gray-300 p-4  mb-4 shadow-md hover:shadow-lg transition-all duration-300"
                          key={paste?._Id || Math.random()} >

                           <div className='flex flex-row place-content-between'>
                            <div className='flex flex-col'>
                            <h2 className='text-3xl font-bold text-left'>{paste.tittle}</h2> 
                     
                           <h2 className='text-xl text-left'>
                                {paste.content} 
                           </h2>
                           </div>
                           <div className=' flex flex-row gap-2 place-content-evenly'>
                                {/* <button>
                                <a href={`/?pasteId=${paste?._id}`}> 
                                  Edit
                                  </a>
                                  </button> */}

                                  {/* Edit button */}
                                  <button className='bg-white  text-black  p-0.5 px-2 h-9'>
                                   <Link to={`/?pasteId=${paste?._Id}`}>
                                   <i class="ri-edit-line"></i>
                                  </Link> 
                                </button>

                                {/* View button */}
                                <button className='bg-white text-black p-0.5 px-2 h-9'>
                                   <a href={`/pastes/${paste?._Id}`}><i class="ri-eye-line"></i></a> 
                                  </button>
                                
                                {/* delete button */}
                                <button className='bg-white text-black p-0.5 px-2 h-9 ' 
                                onClick={()=>handleclick(paste?._Id)}><i class="ri-delete-bin-5-line"></i>
                                </button> 
                              
                                  {/* Copy button */}
                               <button className='bg-white text-black p-0.5 px-2 h-9'
                                onClick={()=>{
                                    navigator.clipboard.writeText (paste.content)
                                   toast.success("Copy Clipboard")
                                 }}>
                                   <i class="ri-file-copy-line"></i>
                                </button>
                                
                                {/* Share button */}
                                 <button  className='bg-white text-black p-0.5 px-2 h-9'
                                 onClick={()=>handleShare(paste.content)}> <i class="ri-share-line"></i></button> 
                           </div>
                          </div>
                          <div className="flex justify-end mt-2 text-white text-sm">
                            {paste.createdAt}
                          </div>
                    </div>
                   
                  )
                }
               )
        }
      </div>
    </div>
  )
}
export default Paste