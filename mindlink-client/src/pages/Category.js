import React, { useEffect, useContext } from 'react'
import { Form, useParams } from 'react-router-dom'
import { CategoryContext } from '../context/CategoryContext'
import SearchBar from '../components/SearchBar';
import { Card } from 'react-bootstrap';
import "./Category.css"

export default function Category({}) {

  const {id} = useParams();
  const {getCatQuizzes, quizzes, category, getCategoryById} = useContext(CategoryContext);

  useEffect(()=>{
    getCatQuizzes(id);
    getCategoryById(id);
  }, [id]);

  return (
    <div className='py-4 px-3 text-center' style={{marginTop:65}}>
        <h2 className='mb-4'>{category ? category.name + " Quizzes" : "Loading..."}</h2>

        {/* Search Bar */}
        <div className='d-flex justify-content-center mb-4'>
          <SearchBar />
        </div>

        <div className='quizGrid'>


          <Card className='categQuiz rounded-0'>
            <Card.Body style={{position:'relative'}}>
              <div className='mb-2 d-flex align-items-center justify-content-center gap-1'>
                <span className='name fw-semibold'>Linear Algebra</span>
                <span>• Math</span>
              </div>
              <div className='mb-2'>Questions: 14</div>    
              <div className='quiz-user'>
                <i class="bi bi-person-fill"></i>
                <span>Tommy</span>
              </div>
            </Card.Body>
          </Card>

         
          
        </div>

    </div>
  )
}
