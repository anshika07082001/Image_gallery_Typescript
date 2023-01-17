import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {imageReducer} from '../types'

var initialState:imageReducer={
    data:[],
    loading:false,
    error:{}
}

// Function fetches the data

export const imageData = createAsyncThunk('image/imageData',
    async ()=>{
        let res;
        try{
            res = await axios.get(
                "https://api.pexels.com/v1/curated?page=11&per_page=30",
                {
                  headers: {
                    Authorization:
                      "563492ad6f9170000100000140eca6e9e65c48b28d882ce1b0a1c1d3",
                    "Content-Type": "multipart/mixed",
                  },
                }
            )
        }
        catch(error){
            console.log(error)
        }
        if(res!==undefined){
            let post = res.data.photos.map((item:any)=>{
                return {
                    comments:[],
                    like:false,
                    dislike:false,
                    src:item.src.original
                }
            })
            return post 
        }
    }
)

export const imageSlice=createSlice({
    name:'image',
    initialState,
    reducers:{
        likeHandler:(state,action)=>{
            state.data[action.payload].like=!state.data[action.payload].like
        },
        dislikeHandler:(state,action)=>{
            state.data[action.payload].dislike=!state.data[action.payload].dislike
        },
        commentsHandler:(state,action)=>{
            state.data[action.payload.ind].comments.push(action.payload.inpVal)
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(imageData.pending,(state,action)=>{
            state.loading=false
        })
        .addCase(imageData.fulfilled,(state,action)=>{
            state.loading=false
            if(action.payload!==undefined){
                state.data=action.payload
            }
        })
        .addCase(imageData.rejected,(state,action)=>{
            state.error=action.error
        })
    }
})

export const {likeHandler,dislikeHandler,commentsHandler}= imageSlice.actions

export default imageSlice.reducer