import React from 'react'
import { Card } from 'react-bootstrap';
import { formatTime } from '../utils/quizHelper';

export default function QuizResultCard({result}) {
  return (
    <Card className='quiz-res-card mb-2'>
        <Card.Body>
        <Card.Title className=' fw-semibold fs-4'>
                <div className='d-flex justify-content-between'>
                    <span>{result.user.name}</span>
                    <span style={{color:'#0C6EFC'}}>{formatTime(result.timeTaken)}</span>
                </div>
        </Card.Title>
            <div style={{fontSize:12}}>{result.user.email}</div>
            <div className='d-flex flex-column justify-content-center align-items-center'>
                <span style={{color:'#0C6EFC'}} className='fs-3'>{result.score}</span>
                <span className='fs-6'>out of <span className='fw-semibold'>{result.numQuestions}</span></span>
            </div>
        </Card.Body>
    </Card>
  )
}
