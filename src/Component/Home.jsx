
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { addToPaste, updateToPaste } from '../redux/pasteSlice'
import { AiOutlineCopy } from "react-icons/ai";
import { toast } from 'react-toastify';

const Home = () => {
    const [tittle, setTittle] = useState("")
    const [value, setvalue] = useState('')
    const [searchParam, setSearchParam] = useSearchParams();
    const pasteId = searchParam.get("pasteId");
    const dispatch=useDispatch()
    const allpastes = useSelector((state)=>state.paste.pastes ) //sbhi paste nikale h


    useEffect(()=>{
        console.log("inside useeffect");
        if(pasteId){
            console.log("inside if");
            const paste= allpastes.find((p) =>p._Id === pasteId);
            console.log(paste);
            
            setTittle(paste.tittle)
            setvalue(paste.content)
        }
    },[pasteId,allpastes]) //pasteId change hone par esiliye useeffect ka use kiya h 
  
    //CreatePaste   
    function createPaste(){
        const paste = {
            tittle:tittle,
            content:value,
            _Id:pasteId || 
                 Date.now().toString(36),
                 createdAt: new Date().toLocaleDateString("en-US", {
                   // weekday: 'long', // To get the full weekday name (optional)
                    year: 'numeric',
                    month: 'long', // To get the full month name
                    day: 'numeric'
                  }),
               // createdAt:new Date().toISOString(),
        }

        if(pasteId){
            //update
            dispatch(updateToPaste(paste));   //the dispatch function is used to send actions to the Redux store These actions then trigger reducers to update the state. 
        }
        else{
            //create
            dispatch(addToPaste(paste));
        }

        //after creation or updation paste
        //khali karna padega na field ko
        setTittle('');
        setvalue('');
        setSearchParam({});
    }

    function handleCopy(){
        navigator.clipboard.writeText (value)
        toast.success("Copy Clipboard")
    }
    return (
        <div>
            <div className='flex flex-row gap-6 place-content-between w-full h-full'>
                <input
                    className='p-2 mt-10 rounded-2xl w-[1000px] border border-gray-300  outline-none'
                    type='text'
                    placeholder='Enter Title here'
                    value={tittle}
                    onChange={(e) => setTittle(e.target.value)}
                />
                <button className='p-2 mt-10 rounded-2xl bg-blue-500 text-white w-auto min-w-[200px] text-center whitespace-nowrap' onClick={createPaste}>
                    {
                        pasteId ? "Update My Paste"
                            : "Create My Paste"
                    }
                </button>
            </div>
            <div className=' relative mt-2 w-full h-full'>
                <textarea className="rounded-2xl mt-4 p-2 pr-10 w-[1200px] border border-gray-300  outline-none"
                    value={value}
                    onChange={(e) => {
                        setvalue(e.target.value)
                    }}
                    placeholder="Enter content here"
                    rows={21}
                />
                <AiOutlineCopy className='absolute top-5 right-3 text-xl cursor-pointer'
                onClick={ handleCopy}
                />
            </div>
        </div>
    )
}

export default Home 