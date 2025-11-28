import React from 'react'
import {Card, Button} from "react-bootstrap";
import {useLocation, useNavigate} from "react-router-dom";

export default function QuizSuccess() {

    const navigate = useNavigate();
    const location = useLocation();
    const quizCode = location.state?.quizCode || "N/A"; // fallback

    const copyToClipboard = () => {
        navigator.clipboard.writeText(quizCode)
            .then(() => alert("Code copied!"))
            .catch(err => alert("Failed to copy"));
    };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
        <Card className="col-sm-8 col-lg-4 col-md-6 p-4 shadow-lg rounded-4">
            <Card.Body>
                <Card.Title className="fw-bold mb-4 text-center fs-4">
                    Share your quiz with others
                </Card.Title>
                    <div className="mb-3 text-center fs-5">
                        Quiz Code: <span className='fw-bold'>{quizCode}</span>
                    </div>

                    <div className="d-flex justify-content-center gap-2">
                        <Button variant='outline-primary' onClick={()=>{navigate('/')}}>Go to HomePage</Button>
                        <Button onClick={copyToClipboard}>Copy to Clipboard</Button>
                    </div>
            </Card.Body>
        </Card>
    </div>
  )
}
