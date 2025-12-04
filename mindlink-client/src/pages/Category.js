import React, { useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { CategoryContext } from '../context/CategoryContext'
import SearchBar from '../components/SearchBar';
import "./Category.css"
import QuizCard from '../components/QuizCard';
import { Spinner } from 'react-bootstrap';

export default function Category({}) {

  const {id} = useParams();
  const {getCatQuizzes, 
    quizzes, 
    category, 
    getCategoryById,
    catLoading} = useContext(CategoryContext);

  useEffect(()=>{
    getCatQuizzes(id);
    getCategoryById(id);
  }, [id]);

  return (
    <div className='py-4 px-3 text-center' style={{marginTop:65}}>
        <h2 style={{marginBottom:80}}>{category ? category.name + " Quizzes" : "Loading..."}</h2>

        {/* Search Bar */}
        <div className='d-flex justify-content-center mb-4'>
          <SearchBar />
        </div>
        {catLoading ? 
          <Spinner animation="border" variant="primary" />
          : <div className='quizGrid'>
            {quizzes.map((quiz,index) => <QuizCard key={index} quiz={quiz}/>)}      
          </div>
        }
        

    </div>
  )
}
