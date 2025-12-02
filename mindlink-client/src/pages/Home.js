import React, { useContext, useEffect } from 'react'
import {Spinner } from 'react-bootstrap'
import './Home.css';
import YourQuizzesCard from '../components/YourQuizzesCard';
import { QuizContext } from '../context/QuizContext';
import {useNavigate} from "react-router-dom";
import CategoryCard from '../components/CategoryCard';

export default function Home() {

    const navigate = useNavigate();
    const {
        getMyQUizzes, 
        myQuizzes, 
        isMyQuizzesLoading} = useContext(QuizContext);

    useEffect(() => {
        getMyQUizzes();
    }, [getMyQUizzes]);

  return (
    <div style={{marginTop:65}} className='px-3 py-4'>
        <div className='mb-5'>
            <h2 className='mb-4'>
            Browse Categories
            </h2>

            <div className='categoryGrid'>
                <CategoryCard />
                <CategoryCard />
                <CategoryCard />
                <CategoryCard />
                <CategoryCard />
                <CategoryCard />
                <CategoryCard />
                <CategoryCard />
                <CategoryCard />
            </div>
        </div>

        <div>
            <h2 className='mb-4'>
                Your Created Quizzes
            </h2>
            
            {isMyQuizzesLoading ? 
            <Spinner animation="border" variant="primary" /> 
            : myQuizzes.slice(0, 2).map((quiz, index) => <div className='col-sm-6 col-lg-3 mb-2' key={index}>
                <YourQuizzesCard  quiz={quiz}/>
            </div>)}
            {myQuizzes.length > 2 && (
                <button 
                className="btn btn-link"
                onClick={()=>{navigate('/your-quizzes')}}
                >View All</button>
            )}

        </div>

    </div>
  )
}
