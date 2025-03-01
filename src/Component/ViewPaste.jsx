import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useSearchParams } from 'react-router-dom'
import { AiOutlineCopy } from "react-icons/ai";
import { toast } from 'react-toastify';

const ViewPaste = () => {
  const {id} = useParams();
  
  
  const allpastes = useSelector((state)=>state.paste.pastes);

  const paste =allpastes.filter((p)=>p._Id === id)[0];
  console.log(paste);
  

    function handleCopy(){
        navigator.clipboard.writeText (paste.content)
        toast.success("Copy Clipboard")
    }
  return (
    <div>
       <div className='flex flex-row gap-6 place-content-between w-full h-full'>
                      <input
                          className='p-2 mt-10 rounded-2xl w-[1000px] border border-gray-300  outline-none'
                          type='text'
                          placeholder='Enter Title here'
                          value={paste.tittle}
                          disabled
                          onChange={(e) => setTittle(e.target.value)}
                      />
                      {/* <button className='p-2 mt-2 rounded-2xl' onClick={createPaste}>
                          {
                              pasteId ? "Update My Paste"
                                  : "Create My Paste"
                          }
                      </button> */}
                  </div>
                  <div className='relative mt-2 w-full h-full'>
                      <textarea className="rounded-2xl mt-4 p-2 pr-10 w-[1200px] border border-gray-300  outline-none"
                          value={paste.content}
                          disabled
                          onChange={(e) => {
                              setvalue(e.target.value)
                          }}
                          placeholder="enter content here"
                          rows={20}
                      />
                      <AiOutlineCopy className='absolute top-5 right-3 text-xl cursor-pointer'
                      onClick={ handleCopy}
                      />
                  </div>
    </div>
  )
}

export default ViewPaste