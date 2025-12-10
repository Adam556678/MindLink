import React, { useState } from 'react'
import { Card } from 'react-bootstrap';

export default function YourQuizzesCard({quiz}) {

  const [copied, setCopied] = useState(false);

  const copyToClipboard = async (text) => {
      try {
        await navigator.clipboard.writeText(text);
        setCopied(true);

        setTimeout(() => setCopied(false) ,3000);
      } catch (error) {
        console.log("Failed to copy");
      }
  };

  return (
    <Card className='yourQuizzes rounded-0'>
        <Card.Body style={{position:'relative'}}>
            <div className=' mb-2'><span className='fw-semibold'>{quiz.title}</span> • {quiz.category}</div>
            <div className='mb-3'>Questions: {quiz.questions.length}</div>
            <div  className='quizCode' onClick={() => copyToClipboard(quiz.code)}>
              {copied ? <i className="bi bi-check2" style={{color:'green'}}></i> : <i className="bi bi-clipboard"></i>}
                <span className='fw-semibold'>{quiz.code}</span>
            </div>
            <ul className='myQuizzesLst'>
                <li><a href='#'>Edit</a></li>
                <li><a href={`quiz/${quiz.id}/results`}>View Results</a></li>
            </ul>
        </Card.Body>
    </Card>
  )
}
