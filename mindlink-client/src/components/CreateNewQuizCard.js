import React from 'react'
import { Card } from 'react-bootstrap';

export default function CreateNewQuizCard({quiz}) {
  return (
    <div className='yourQuizzes addNewQuiz rounded-0' onClick={()=>{}}>
        
      <i class="bi bi-plus-lg"></i>
      <p>Create a new quiz</p>
        
    </div>
  )
}
