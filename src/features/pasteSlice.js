// src/features/counterSlice.js
import { createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

export const pasteSlice = createSlice({
  name: 'paste',
  initialState: {
    pastes: localStorage.getItem("pastes")
      ? JSON.parse(localStorage.getItem("pastes"))
      : []
  },
  reducers: {
    addToPaste: (state, action) => {
      const paste = action.payload;
      const exists = state.pastes.some(p => p.id === paste._id);

      if (exists) {
        toast.error("Paste already exists!");
        return;
      }
      state.pastes.push(paste);
      localStorage.setItem("pastes", JSON.stringify(state.pastes));
      toast("Paste created successfully");
    },
    updateToPaste: (state, action) => {
      const paste = action.payload;
      const index = state.pastes.findIndex((item) => item._id === paste._id);
      if (index >= 0) {
        state.pastes[index] = paste;
        localStorage.setItem("pastes", JSON.stringify(state.pastes));
        toast.success("Paste updated");
      }

    },
    resetAllPastes: (state, action) => {
      state.pastes=[];
      localStorage.removeItem("pastes");

    },
    removeFromPaste: (state, action) => {

      const pasteId=action.payload;
      console.log(pasteId);
      const index=state.pastes.findIndex((item)=>item._id===pasteId);
      if(index>=0){
        state.pastes.splice(index,1);
        localStorage.setItem("pastes",JSON.stringify(state.pastes));
        toast.success("Paste Deleted");
      }
    },
  },
});

// Export actions
export const { addToPaste, updateToPaste, resetAllPastes, removeFromPaste } = pasteSlice.actions;

// Export reducer to be added to the store
export default pasteSlice.reducer;
