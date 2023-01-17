import { SerializedError } from "@reduxjs/toolkit"

export interface post{
    comments:string[],
    dislike:boolean,
    like:boolean,
    src:string
}

export interface imageReducer{
    data:post[],
    loading:boolean,
    error:SerializedError
}

export interface state {
    imageSlice:imageReducer
}