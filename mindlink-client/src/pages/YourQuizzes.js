import React, { useContext, useEffect } from 'react'
import { QuizContext } from '../context/QuizContext'
import { Spinner } from 'react-bootstrap';
import YourQuizzesCard from '../components/YourQuizzesCard';
import CreateNewQuizCard from '../components/CreateNewQuizCard';
import { useNavigate } from 'react-router-dom';

export default function YourQuizzes() {

    const {
        isMyQuizzesLoading, 
        getMyQUizzes, 
        myQuizzes} = useContext(QuizContext);

    useEffect(() => {
        getMyQUizzes();
    }, [getMyQUizzes]);

    const navigate = useNavigate();

    const navToAddQuiz = () => {
        navigate("/add-quiz");
    }

  return (
    <div className='py-4 px-3 text-center' style={{marginTop:65}}>
        <h2 className='mb-4'>
                Your Created Quizzes
        </h2>

        {isMyQuizzesLoading ? 
            <Spinner animation="border" variant="primary" /> 
            : <div className='d-flex flex-column align-items-center'>
                {myQuizzes.map((quiz, index) => <div className='col-sm-6 col-lg-4 mb-2' key={index}>
                <YourQuizzesCard  quiz={quiz}/>
            </div>)}
                <div className='col-sm-6 col-lg-4 mb-2 fs-2'
                onClick={()=>navToAddQuiz()}>
                    {/* Create a new Quiz Card */}
                    <CreateNewQuizCard />

                </div>
            
            </div>
        
        }
        
    </div>
  )
}
