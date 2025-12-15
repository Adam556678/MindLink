import React, { useContext, useEffect } from 'react'
import {Spinner } from 'react-bootstrap'
import './Home.css';
import YourQuizzesCard from '../components/YourQuizzesCard';
import { QuizContext } from '../context/QuizContext';
import {useNavigate} from "react-router-dom";
import CategoryCard from '../components/CategoryCard';
import { CategoryContext } from '../context/CategoryContext';
import QuizYouTookCard from '../components/QuizYouTookCard';
import EmptyQuizzes from '../components/EmptyQuizzes';

export default function Home() {

    const navigate = useNavigate();
    const {
        getMyQUizzes, 
        myQuizzes, 
        isMyQuizzesLoading,
        getQuizzesTookByUser,
        quizzesTookByUser,
        quizzesTookByUserLoading,
        quizzesTookByUserError} = useContext(QuizContext);

    const {categories,
        getCategories,
        catLoading} = useContext(CategoryContext);

    
    useEffect(() => {
        getMyQUizzes();
        getCategories();
        getQuizzesTookByUser()
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
            : myQuizzes.length > 0 ? (myQuizzes.slice(0, 2).map((quiz, index) => <div className='col-sm-9 col-lg-3 mb-2' key={index}>
                <YourQuizzesCard  quiz={quiz}/>
            </div>)) : <div style={{marginLeft:15}}><EmptyQuizzes /></div>}
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
            
            {quizzesTookByUserLoading ? 
            <Spinner animation="border" variant="primary" /> 
            : quizzesTookByUser.length > 0 ? (quizzesTookByUser.slice(0, 2).map((result, index) => <div className='col-sm-9 col-lg-3 mb-2' key={index}>
                <QuizYouTookCard result={result}/>
            </div>)) : <div style={{marginLeft:15}}><EmptyQuizzes /></div>}
            {quizzesTookByUser.length > 2 && (
                <button 
                className="btn btn-link"
                onClick={()=>{navigate('/your-quizzes')}}
                >View All</button>
            )}

        </div>

    </div>
  )
}
