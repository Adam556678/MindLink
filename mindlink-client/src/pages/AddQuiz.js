import React, { useContext } from 'react'
import {Card, Form, Dropdown, DropdownMenu} from "react-bootstrap"
import { QuizContext } from '../context/QuizContext'
import { CATEGORIES } from '../constants/QuizConstants';
import './AddQuiz.css';
import QuestionBox from '../components/QuestionBox';

export default function AddQuiz() {

    const {
        quizInfo, 
        updateQuizInfo, 
        questions,
        addQuestion} = useContext(QuizContext);

    function addNewQuestion(e) {
        e.preventDefault();
        addQuestion({
            text: '',
            option1: '', 
            option2: '', 
            option3: '', 
            option4: '',
            answer: 0 
        });
    }

  return (
    <div className='d-flex justify-content-center align-items-center mt-5 pt-5'>
        <Card className="col-sm-8 col-lg-4 col-md-6 p-4 shadow-lg rounded-4">
            <Card.Body>
                <Card.Title className='fw-bold text-center fs-2 mb-3'>
                    Create Quiz
                </Card.Title>

                <Form>
                    <Form.Group controlId='quizTitle' className='mb-4'>
                        <Form.Label style={{fontWeight:500, fontSize:16}}>Quiz Title</Form.Label>
                        <Form.Control type='text' placeholder='Enter title..'></Form.Control>
                    </Form.Group>
                    <div className='d-flex gap-2 mb-4 justify-content-start'>
                        <Form.Group controlId='quizCateg' className='mb-4 '>
                        <Dropdown>
                                <Dropdown.Toggle id="dropdown-basic" variant='outline-primary'>
                                    {quizInfo.category == '' ? "Category" : quizInfo.category}
                                </Dropdown.Toggle>

                            <Dropdown.Menu>
                                {CATEGORIES.map((cat, index) => (
                                    <Dropdown.Item key={index} onClick={() => updateQuizInfo({category: cat})}>
                                        {cat}
                                    </Dropdown.Item>
                                    ))}
                            </Dropdown.Menu>
                            </Dropdown>
                    </Form.Group>
                    <Form.Group controlId='quizAccess' className='mb-4'>
                        <Dropdown>
                                <Dropdown.Toggle id="dropdown-basic" variant='outline-primary'>
                                    {quizInfo.access == '' ? "Accessibility" : quizInfo.access}
                                </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => updateQuizInfo({access: "Public"})}>Public</Dropdown.Item>
                                <Dropdown.Item onClick={() => updateQuizInfo({access: "Private"})}>Private</Dropdown.Item>
                            </Dropdown.Menu>
                            </Dropdown>
                    </Form.Group>
                    </div>


                    {/* Adding Questions */}
                    <h4 className='mb-4'>Questions</h4>
                    
                    {questions.map((qn, index) => {
                        console.log(index);
                        return <QuestionBox key={index} index={index}/>
                    })}

                    <div className='d-flex align-items-center gap-2 mt-3'>
                        <button className='add-btn' onClick={(e)=>addNewQuestion(e)}>
                                +
                        </button>
                        <span style={{fontWeight:500}}>Add a question</span>  
                    </div>
                </Form>
            </Card.Body>
        </Card>

    </div>
  )
}
