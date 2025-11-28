import React from 'react'
import { Card } from 'react-bootstrap'
import './Home.css';

export default function Home() {
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
            
            <div className='col-sm-6 col-lg-3'>
                <Card className='yourQuizzes rounded-0'>
                    <Card.Body style={{position:'relative'}}>
                        <div className='fw-semibold mb-2'>Javascript Fundamentals</div>
                        <div className='mb-3'>Questions: 15</div>
                        <div  className='quizCode'>
                            <i class="bi bi-clipboard"></i>
                            <span className='fw-semibold'>XYW3Z#</span>
                        </div>
                        <ul className='myQuizzesLst'>
                            <li><a href='#'>Edit</a></li>
                            <li><a href='#'>View Results</a></li>
                        </ul>
                    </Card.Body>
                </Card>
            </div>

            
        </div>

    </div>
  )
}
