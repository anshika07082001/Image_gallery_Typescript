import React, { useEffect, useRef } from 'react'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { commentsHandler, dislikeHandler, imageData, likeHandler } from '../features/imageSlice'
import {state} from '../types'

const ImageGallery = () => {

  const dispatch=useDispatch()
  const useAppSelector:TypedUseSelectorHook<state>=useSelector
  var state= useAppSelector((state)=>state)
  var comments = useRef<HTMLInputElement[]>([])

  useEffect(()=>{
    dispatch<any>(imageData())   
  },[])

  useEffect(()=>{
    var jsonArr = JSON.stringify(state)
    localStorage.setItem('Posts',jsonArr)
  },[state])
  // function add comments to post 
  const commentHandler=(i:number)=>{
    if(comments.current!==null){
      dispatch<any>(commentsHandler({ind:i,inpVal:comments.current[i].value}))
    }
    comments.current[i].value=''    
  }
  
  return (
  <div className='col-10 m-auto'>
  {state.imageSlice.data.map((item,i)=>{
    return(
    <div className='bg-light mt-4 p-2 text-center card col-7 m-auto'>
      <img src={item.src} alt='' style={{height:'400px',width:'100%'}} className='m-auto rounded'/>
      <div className='col-3 m-auto mt-1 p-1 text-center d-flex justify-content-around'>
        {!item.like?<i className="fs-4 bi bi-hand-thumbs-up-fill" onClick={()=>{dispatch<any>(likeHandler(i))}} ></i>:
        <i className="fs-4 bi bi-hand-thumbs-up-fill" style={{color:'#3297ed'}} onClick={()=>{dispatch<any>(likeHandler(i))}}></i>}
        {!item.dislike? <i className="fs-4 bi bi-hand-thumbs-down-fill" onClick={()=>{dispatch<any>(dislikeHandler(i))}}></i>:
        <i className="fs-4 bi bi-hand-thumbs-down-fill" style={{color:'#3297ed'}} onClick={()=>{dispatch<any>(dislikeHandler(i))}}></i>}
      </div>
      <div className='col-12 border m-auto mt-2 border-secondary rounded'>
        <input className='p-2 col-8 border-0' style={{outline:'none'}} ref={(val)=>{val!==null && comments.current.push(val)}}/>
        <button className='p-2 border-0 rounded bg-white' onClick={()=>commentHandler(i)}>Add Comment</button>
      </div>
      {item.comments.length>0?
      <div className='text-start'>
      <ul className='fs-3 fw-bold'>Watchers Comments
      {item.comments.map((com)=>{
        return (
          <li className='fs-6 fw-light text-primary'>{com}</li>
        )
      })}
      </ul>
      </div>:" "}
    </div>
    )
  })}
  </div>
  )
}

export default ImageGallery