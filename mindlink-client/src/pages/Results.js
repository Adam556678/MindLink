import React from 'react'
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import "./Result.css";
import { Button, Card } from 'react-bootstrap';

export default function Result() {
    const { quizId, resId } = useParams();
    
    const [result, setResult] = useState(null);

    // useEffect(() => {
    //     const fetchResult = async () => {
    //         const data = await getByIdRequest(
    //             `${ENDPOINTS.quiz}/${quizId}/results`, 
    //             resId
    //         );
    //         setResult(data);
    //     };
    //     fetchResult();
    // }, [quizId, resId]);

  return (
    <div className='center-screen'>
        <Card style={{width: '30%', boxShadow:' 0px 2px 5px -2px'}}>
            <Card.Body>
                <Card.Title style={{marginBottom:40, marginTop:10}} className='text-center'>
                    <div className='fs-3'>
                        <div className='mb-2'>Your Score is:</div>
                        <span style={{color:'#0b63e7'}}>5</span> / 12
                    </div>
                    <div style={{fontSize:16, fontWeight:400}} className='mt-2'>
                        Time Taken: <span style={{color:'#0b63e7'}}>01:30</span>
                    </div>
                </Card.Title>
                <div className='d-flex justify-content-center align-items-center mb-1 gap-2'>
                    <Button size='lg' variant='outline-primary'>Retake</Button>
                    <Button size='lg'>Home</Button>
                </div>
            </Card.Body>
        </Card>
    </div>
  )
}
