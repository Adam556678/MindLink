import React, { useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import "./Result.css";
import { Button, Card } from 'react-bootstrap';
import { QuizContext } from '../context/QuizContext';
import { formatTime } from '../utils/quizHelper';

export default function Result() {
    const { quizId, resId } = useParams();
    
    const {getResults} = useContext(QuizContext);
    const [results, setResults] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchResult = async () => {
            const data = await getResults(resId);
            setResults(data);
        };

        fetchResult();
    }, [quizId, resId]);

  return (
    <div className='center-screen'>
        {results ? 
        <Card style={{width: '30%', boxShadow:' 0px 2px 5px -2px'}}>
            <Card.Body>
                <Card.Title style={{marginBottom:40, marginTop:10}} className='text-center'>
                    <div className='fs-3'>
                        <div className='mb-2'>Your Score is:</div>
                        <span style={{color:'#0b63e7'}}>{results.score}</span> / {results.numQuestions}
                    </div>
                    <div style={{fontSize:16, fontWeight:400}} className='mt-2'>
                        Time Taken: <span style={{color:'#0b63e7'}}>{formatTime(results.timeTaken)}</span>
                    </div>
                </Card.Title>
                <div className='d-flex justify-content-center align-items-center mb-1 gap-2'>
                    <Button size='lg' variant='outline-primary' onClick={()=>{navigate(`/quiz/${quizId}`)}}>Retake</Button>
                    <Button size='lg' onClick={()=>{navigate("/")}}>Home</Button>
                </div>
            </Card.Body>
        </Card> : null}
    </div>
  )
}
