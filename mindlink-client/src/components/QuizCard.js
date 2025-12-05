import React from 'react'
import { Card} from "react-bootstrap";
import "../pages/Category.css"
import { useNavigate } from 'react-router-dom';

export default function QuizCard({quiz}) {

  const navigate = useNavigate();

  return (
    <Card className='categQuiz rounded-0' onClick={()=>{navigate(`/quiz/${quiz.id}`)}}>
        <Card.Body style={{position:'relative'}}>
            <div className='mb-2 d-flex align-items-center justify-content-center gap-1'>
            <span className='name fw-semibold'>{quiz.title}</span>
            <span>• {quiz.category}</span>
            </div>
            <div className='mb-2'>Questions: {quiz.questions.length}</div>    
            <div className='quiz-user'>
            <i class="bi bi-person-fill"></i>
            <span>{quiz.userName}</span>
            </div>
        </Card.Body>
    </Card>
  )
}
