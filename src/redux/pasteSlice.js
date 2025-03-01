import { createSlice } from '@reduxjs/toolkit'

import {toast } from 'react-toastify';

const initialState = {
  pastes:localStorage.getItem("pastes")
        ? JSON.parse(localStorage.getItem("pastes"))
        : []
}

export const pasteSlice = createSlice({
  name: 'paste',
  initialState,
  reducers: {
    addToPaste: (state,action) => {
      const paste =action.payload; //ese humne paste nikala h jo home se bheja h
      state.pastes.push(paste); // jo uper ka pastes h usme value push ki h centerlized me aa gya h
      localStorage.setItem("pastes",JSON.stringify(state.pastes)); //localstorage me key  value pair me store data
      toast("Paste Created Successfully!!");
    },
    updateToPaste: (state,action) => {
      const paste= action.payload;
      console.log(paste)
      const index=  state.pastes.findIndex((item)=>
      item._Id === paste._Id);

      if(index >= 0){
        state.pastes[index] = paste; //paste update inside the state
        localStorage.setItem("pastes",JSON.stringify(state.pastes));

        toast.success("update successfully");
      }
    },
    
    resetAllPaste: (state, action) => {
      state.pastes =[]; 
      localStorage.removeItem("pastes");
    },
    removeFromPaste:(state,action) => {
      const pasteId =action.payload //paste hi nikala h
      console.log(pasteId);
      const index= state.pastes.findIndex((item)=>
      item._Id === pasteId);
     console.log(index);
     
      if(index >=0) {
        state.pastes.splice(index,1);
        localStorage.setItem("pastes", JSON.stringify(state.pastes));

        toast.success("Paste deleted");
      }
    },
  },
})

// Action creators are generated for each case reducer function
export const {  addToPaste, updateToPaste,  resetAllPaste, removeFromPaste } = pasteSlice.actions

export default pasteSlice.reducer