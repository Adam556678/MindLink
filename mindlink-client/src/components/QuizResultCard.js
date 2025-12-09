import React from 'react'
import { Card } from 'react-bootstrap';
import { formatTime } from '../utils/quizHelper';

export default function QuizResultCard() {
  return (
    <Card className='quiz-res-card'>
        <Card.Body>
        <Card.Title className=' fw-semibold fs-4'>
                <div className='d-flex justify-content-between'>
                    <span>Adam Saeed</span>
                    <span style={{color:'#0C6EFC'}}>{formatTime(160)}</span>
                </div>
        </Card.Title>
            <div style={{fontSize:12}}>mahmudramadan75@yahoo.com</div>
            <div className='d-flex flex-column justify-content-center align-items-center'>
                <span style={{color:'#0C6EFC'}} className='fs-3'>5</span>
                <span className='fs-6'>out of <span className='fw-semibold'>12</span></span>
            </div>
        </Card.Body>
    </Card>
  )
}
