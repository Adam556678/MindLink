import React, { useContext, useEffect } from 'react'
import { QuizContext } from '../context/QuizContext'
import QuizYouTookCard from '../components/QuizYouTookCard';
import { Spinner } from 'react-bootstrap';

export default function QuizzesYouTook() {

    const {getQuizzesTookByUser,
        quizzesTookByUser,
        quizzesTookByUserLoading,
        quizzesTookByUserError} = useContext(QuizContext);

    useEffect(() => {
        getQuizzesTookByUser();
    }, [getQuizzesTookByUser]);

  return (
    <div className='py-4 px-3 text-center' style={{marginTop:65}}>
        <h2 className='mb-4'>
                Quizzes You Took
        </h2>

        {quizzesTookByUserLoading ? 
            <Spinner animation="border" variant="primary" /> 
            : <div className='d-flex flex-column align-items-center'>
                {quizzesTookByUser.map((result, index) => <div className='col-sm-6 col-lg-4 mb-2' key={index}>
                <QuizYouTookCard  result={result}/>
            </div>)}
            </div>
        
        }
    </div>
  )
}
