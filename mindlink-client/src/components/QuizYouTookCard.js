import React from 'react'
import { Card } from 'react-bootstrap'
import "./QuizYouTookCard.css";

export default function QuizYouTookCard({result}) {
  return (
    <Card className='quiz-yt-card rounded-0'>
        <Card.Body style={{position:'relative'}}>
            <div className=' mb-2'><span className='fw-semibold'>{result.quiz.title}</span> • {result.quiz.category}</div>
            <div className='mb-3'>Questions: {result.numQuestions}</div>

            <div className='d-flex justify-content-between align-items-center'>
                <a className='retake' href={`/quiz/${result.quiz.id}`}>Retake</a>
                <span><span className='fw-bold fs-3' style={{color:'#0C6EFC'}}>{result.score}</span>/{result.numQuestions}</span>
            </div>
        </Card.Body>
    </Card>
  )
}
