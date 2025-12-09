import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { QuizContext } from '../context/QuizContext';
import "./QuizResults.css"
import QuizResultCard from '../components/QuizResultCard';

export default function QuizResults() {
    const {quizId} = useParams();

    const {getQuizResults,
        quizResults,
        quizResultsError,
        quizResultsLoading,
        getQuizById,
        quiz} = useContext(QuizContext);

    useEffect(()=>{
        getQuizResults(quizId);
        getQuizById(quizId);
    }, [quizId]);

    return (
        <div className='py-4 px-3 d-flex flex-column justify-content-center align-items-center' style={{marginTop:65}}>
            <h2 className='mb-4'>
                {quiz ? quiz.title + " Results" : "Loading..."}
            </h2>

            {quizResults && quizResults.length > 0 ? 
            <QuizResultCard />
            :<div style={{marginTop:'10%'}}> No results to show</div> }
        </div>
    )
}
