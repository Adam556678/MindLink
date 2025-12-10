import React, { useContext, useEffect } from 'react'
import {Spinner } from 'react-bootstrap'
import './Home.css';
import YourQuizzesCard from '../components/YourQuizzesCard';
import { QuizContext } from '../context/QuizContext';
import {useNavigate} from "react-router-dom";
import CategoryCard from '../components/CategoryCard';
import { CategoryContext } from '../context/CategoryContext';
import QuizYouTookCard from '../components/QuizYouTookCard';

export default function Home() {

    const navigate = useNavigate();
    const {
        getMyQUizzes, 
        myQuizzes, 
        isMyQuizzesLoading} = useContext(QuizContext);

    const {categories,
        getCategories,
        catLoading} = useContext(CategoryContext);

    
    useEffect(() => {
        getMyQUizzes();
        getCategories();
    }, [getMyQUizzes, getCategories]);

  return (
    <div style={{marginTop:65}} className='px-3 py-4'>
        <div className='mb-5'>
            <h2 className='mb-4'>
            Browse Categories
            </h2>

            {catLoading ?
            <Spinner animation="border" variant="primary" /> 
              : <div className='categoryGrid'>
                {categories.map((cat, index) => <CategoryCard category={cat} index={index} key={index}/>)}    
            </div>
            }
        </div>

        <div className='mb-5'>
            <h2 className='mb-4'>
                Your Created Quizzes
            </h2>
            
            {isMyQuizzesLoading ? 
            <Spinner animation="border" variant="primary" /> 
            : myQuizzes.slice(0, 2).map((quiz, index) => <div className='col-sm-9 col-lg-3 mb-2' key={index}>
                <YourQuizzesCard  quiz={quiz}/>
            </div>)}
            {myQuizzes.length > 2 && (
                <button 
                className="btn btn-link"
                onClick={()=>{navigate('/your-quizzes')}}
                >View All</button>
            )}

        </div>

        <div className='mb-5'>
            <h2 className='mb-4'>
                Quizzes You Took
            </h2>
            
            <div className='col-sm-9 col-lg-3 mb-2'>
                <QuizYouTookCard />
            </div>


        </div>

    </div>
  )
}
