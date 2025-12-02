import React, { useContext, useEffect } from 'react'
import { Card, Spinner } from 'react-bootstrap'
import './Home.css';
import YourQuizzesCard from '../components/YourQuizzesCard';
import { QuizContext } from '../context/QuizContext';
import {useNavigate} from "react-router-dom";

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

            <Card style={{
                width:'200px', 
                height:'180px', 
                backgroundColor:'#ffc0cb', 
                border:'none', 
                overflow:'hidden', 
                display:'flex', 
            }} 
            className='shadow position-relative'
            >
                <div style={{
                    height: '75%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <i className="bi bi-flask fs-1"></i>
                </div>           

                <div style={{
                    width:'100%', 
                    height:'25%', 
                    backgroundColor:'#f3f6f8ff', 
                    position:'absolute', 
                    bottom:0, 
                    display:'flex', 
                    justifyContent:'center', 
                    alignItems:'center', 
                    fontSize:20}}>
                    Science
                </div>
            </Card>
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
