import React from 'react'
import NotFound from "../assets/NotFound.png"

export default function EmptyQuizzes() {
  return (
    <div style={{height:50, opacity:0.6}} className='d-flex align-items-center gap-2'>
        <img src={NotFound} width={32}></img>
        <p className='fs-5'>No Quizzes To Show</p>
    </div>
  )
}
