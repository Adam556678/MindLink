import React, { useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { CategoryContext } from '../context/CategoryContext'
import SearchBar from '../components/SearchBar';
import "./Category.css"
import QuizCard from '../components/QuizCard';
import { Spinner } from 'react-bootstrap';
import EmptyQuizzes from '../components/EmptyQuizzes';

export default function Category({}) {

  const {id} = useParams();
  const {getCatQuizzes, 
    quizzes, 
    category, 
    getCategoryById,
    catLoading,
  filteredQuizzes} = useContext(CategoryContext);

  useEffect(()=>{
    getCatQuizzes(id);
    getCategoryById(id);
  }, [id]);

  return (
    <div className='py-4 px-3 text-center' style={{marginTop:65}}>
        <h2 style={{marginBottom:80}}>{category ? category.name + " Quizzes" : "Loading..."}</h2>

        {/* Search Bar */}
        <div className='d-flex justify-content-center' style={{marginBottom:40}}>
          <SearchBar />
        </div>
        {catLoading ? 
          <Spinner animation="border" variant="primary" />
          : <div className='quizGrid'>
            {filteredQuizzes.length > 0 ? filteredQuizzes.map((quiz,index) => 
            <QuizCard key={index} quiz={quiz}/>) 
            : <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "40vh" }}>
                <EmptyQuizzes />
              </div>}      
          </div>
        }
        

    </div>
  )
}
