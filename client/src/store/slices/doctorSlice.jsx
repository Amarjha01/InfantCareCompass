import { createSlice } from "@reduxjs/toolkit";

export const doctorSlice = createSlice({
    name:'doctor',
    initialState:[],

    reducers:{
        doctorInfo(state,action){
            state.push(action.payload);
        }
    }
})

export const {doctorInfo} = doctorSlice.actions;