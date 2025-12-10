import React from 'react'
import { Card } from 'react-bootstrap'
import "./QuizYouTookCard.css";

export default function QuizYouTookCard() {
  return (
    <Card className='quiz-yt-card rounded-0'>
        <Card.Body style={{position:'relative'}}>
            <div className=' mb-2'><span className='fw-semibold'>Linear Algebra I</span> • Math</div>
            <div className='mb-3'>Questions: 8</div>

            <div className='d-flex justify-content-between align-items-center'>
                <a className='retake' href='#'>Retake</a>
                <span><span className='fw-bold fs-3' style={{color:'#0C6EFC'}}>5</span>/12</span>
            </div>
        </Card.Body>
    </Card>
  )
}
