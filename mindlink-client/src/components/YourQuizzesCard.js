import React from 'react'

export default function YourQuizzesCard() {
  return (
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
  )
}
