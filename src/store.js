import { configureStore } from "@reduxjs/toolkit";
import imageSlice from "./features/imageSlice";
const store = configureStore({
    reducer:{
        imageSlice
    }
})

export default store