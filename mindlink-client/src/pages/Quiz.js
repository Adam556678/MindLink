import React, { useContext, useEffect, useState } from 'react'
import { Button, Card, ProgressBar, Spinner } from 'react-bootstrap'
import { CategoryContext } from '../context/CategoryContext';
import { QuizContext } from '../context/QuizContext';
import { useParams } from 'react-router-dom';
import "./Quiz.css"
import { OPTIONS } from '../constants/QuizConstants';
import { formatTime } from '../utils/quizHelper';

export default function Quiz() {

    const {id} = useParams();
    const {getQuizById,
        fetchQuizError,
        quiz,
        fetchQuizLoading} = useContext(QuizContext);
    
    const [qstnIdx, setQstnIdx] = useState(0);
    const [timeTaken, setTimeTaken] = useState(0);
    const [selectedOptions, setSelectedOptions] = useState({});
    let timer;

    const startTimer = () => {
        timer = setInterval(() => {
        setTimeTaken(prev => prev + 1);
        }, 1000);
    }

    useEffect(() => {
        getQuizById(id);
        startTimer();

        return () => {
           clearInterval(timer);
        }
    }, [id])

    const selectOption = (optIdx) => {
        setSelectedOptions(prev => ({...prev, [qstnIdx]:optIdx+1}));
    }

    const calculateScore = () => {
        var score = 0;

        quiz.questions.forEach((qstn, index) => {
            if(qstn.answer == selectedOptions[index]){
                score += 1;
            }    
        });

        console.log(score);
    }

  return (
    <>
        <h3 className='quiz-title'>
            {quiz ? quiz.title : "Loading..."}
        </h3>
        {
            fetchQuizLoading ? <div className="d-flex justify-content-center my-5">
                <Spinner variant='primary' />
            </div>
            :
            <Card className='question-card'>
            <ProgressBar className='quiz-progress' now={quiz ? ((qstnIdx+1)/quiz.questions.length)*100 : null} />

            <Card.Body>
                <Card.Title style={{marginBottom:25, fontSize:22}}>
                    <div className='d-flex justify-content-between mb-3'> 
                        <span>
                            <span style={{color:'#0b63e7ff'}}> {qstnIdx+1} </span> of 
                            {quiz ? " " + quiz.questions.length : null}
                        </span>
                        <span style={{color:'#0b63e7ff'}}>
                            {formatTime(timeTaken)}
                        </span>
                    </div>
                    {quiz ? quiz.questions[qstnIdx].text : null}
                </Card.Title>

                <div style={{marginBottom:50}}>
                    {quiz ? OPTIONS.map((opt, idx) => <div 
                        className={`option mb-2 ${selectedOptions[qstnIdx] === idx+1 ? "selected" : ""}`} 
                        key={idx}
                        onClick={()=> selectOption(idx)}>
                            <span className='fw-bold'>{String.fromCharCode(65 + idx) + '. '}</span>
                            <span>{quiz.questions[qstnIdx][opt]}</span>
                        </div>) 
                    : null}
                </div>

                <div className='d-flex justify-content-between'>
                    <Button className={qstnIdx > 0 ? 'quiz-prev-btn-active' : 'quiz-prev-btn-disabled'}
                        onClick={()=>{
                            if (qstnIdx > 0){
                                setQstnIdx(prev => prev-1);
                            }
                        }}>
                        <div className='d-flex gap-1 fs-5'>
                            <i class="bi bi-chevron-left"></i>
                            <span>Previous</span>
                        </div>
                    </Button>
                    {quiz ? qstnIdx === quiz.questions.length - 1 
                    ? <Button className='quiz-next-btn-active fs-5'
                        onClick={()=>{
                            console.log(selectedOptions);
                            console.log(quiz);
                            calculateScore();
                            }}>
                        Submit
                        </Button> 
                    : <Button className='quiz-next-btn-active'
                        onClick={()=>{setQstnIdx(prev => prev+1)}}>
                        <div className='d-flex gap-1 fs-5'>
                            <span>Next</span>
                            <i class="bi bi-chevron-right"></i>
                        </div>
                    </Button>
                     : null}
                </div>
            </Card.Body>
        </Card>
        }
        
    </>
  )
}
