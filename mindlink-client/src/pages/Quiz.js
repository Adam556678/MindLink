import React, { useContext, useEffect } from 'react'
import { Button, Card, ProgressBar } from 'react-bootstrap'
import { CategoryContext } from '../context/CategoryContext';
import { QuizContext } from '../context/QuizContext';
import { useParams } from 'react-router-dom';
import "./Quiz.css"

export default function Quiz() {

    const {id} = useParams();
    const {} = useContext(QuizContext);

    useEffect(() => {
        
    }, [id])

  return (
    <>
        <h3 className='quiz-title'>
            Quiz Title
        </h3>

        <Card className='question-card'>
            <ProgressBar className='quiz-progress' now={40} />

            <Card.Body>
                <Card.Title style={{marginBottom:25, fontSize:22}}>
                    <div className='d-flex justify-content-between mb-3'> 
                        <span>
                            <span style={{color:'#0b63e7ff'}}> 4 </span> of 15
                        </span>
                        <span style={{color:'#0b63e7ff'}}>
                            Timer
                        </span>
                    </div>
                    This is a question, answer below:
                </Card.Title>

                <div style={{marginBottom:50}}>
                    <div className='option mb-2'>
                        <span className='fw-bold'>A.</span>
                        <span> HTML</span>
                    </div>
                    <div className='option mb-2'>
                        <span className='fw-bold'>B.</span>
                        <span> CSS</span>
                    </div>
                    <div className='option mb-2'>
                        <span className='fw-bold'>C.</span>
                        <span> JavaScript</span>
                    </div>
                    <div className='option mb-2'>
                        <span className='fw-bold'>D.</span>
                        <span> None of the above</span>
                    </div>
                </div>

                <div className='d-flex justify-content-between'>
                    <Button style={{backgroundColor:'white', border:'none', color:'#0b63e7ff'}}>
                        <div className='d-flex gap-1 fs-5'>
                            <i class="bi bi-chevron-left"></i>
                            <span>Previous</span>
                        </div>
                    </Button>
                    <Button style={{backgroundColor:'#0b63e7ff', color:'white'}}>
                        <div className='d-flex gap-1 fs-5'>
                            <span>Next</span>
                            <i class="bi bi-chevron-right"></i>
                        </div>
                    </Button>
                </div>
            </Card.Body>
        </Card>
    </>
  )
}
