import React, { useContext } from 'react'
import {Form, Dropdown} from "react-bootstrap";
import { QuizContext } from '../context/QuizContext';

export default function QuestionBox({index}) {

    const {questions, removeQuestion, updateQuestion} = useContext(QuizContext);

  return (
    <div className='add-qstn-box mt-2'>
        
        {/* Question num & Delete button */}
        <div className='d-flex align-items-center justify-content-between gap-2'>
            <span style={{fontWeight:500, fontSize:16}}>Question {index+1}</span>
            {index > 0 ? 
            <button className='del-btn' onClick={(e) => {e.preventDefault(); removeQuestion(index)}}>
                <i className="bi bi-x fs-4"></i>
            </button> 
            : null}
        </div>

        <Form.Group controlId='add-question' className='mb-2 mt-2'>
            <Form.Control as="textarea" 
            value={questions[index].text} 
            onChange={(e) => updateQuestion(index, "text" ,e.target.value)} 
            placeholder='Enter question...'></Form.Control>
        </Form.Group>

        {/* Question Options */}

        <Form.Group controlId='question-op1' className='mb-1'>
            <div className='d-flex align-items-center gap-2'>
                <Form.Label style={{fontWeight:400, fontSize:15, margin:0}}>Option 1</Form.Label>
                <Form.Control type='text' 
                style={{width:'50%'}} 
                value={questions[index].option1} 
                onChange={(e) => updateQuestion(index, "option1" ,e.target.value)}
                placeholder='Enter option...'></Form.Control>
            </div>
        </Form.Group>

        <Form.Group controlId='question-op2' className='mb-1'>
            <div className='d-flex align-items-center gap-2'>
                <Form.Label style={{fontWeight:400, fontSize:15, margin:0}}>Option 2</Form.Label>
                <Form.Control type='text' 
                style={{width:'50%'}} 
                value={questions[index].option2} 
                onChange={(e) => updateQuestion(index, "option2" ,e.target.value)}
                placeholder='Enter option...'></Form.Control>
            </div>
        </Form.Group>

        <Form.Group controlId='question-op3' className='mb-1'>
            <div className='d-flex align-items-center gap-2'>
                <Form.Label style={{fontWeight:400, fontSize:15, margin:0}}>Option 3</Form.Label>
                <Form.Control type='text' 
                style={{width:'50%'}} 
                value={questions[index].option3} 
                onChange={(e) => updateQuestion(index, "option3" ,e.target.value)}
                placeholder='Enter option...'></Form.Control>
            </div>
        </Form.Group>

        <Form.Group controlId='question-op4' className='mb-1'>
            <div className='d-flex align-items-center gap-2'>
                <Form.Label style={{fontWeight:400, fontSize:15, margin:0}}>Option 4</Form.Label>
                <Form.Control type='text' 
                style={{width:'50%'}} 
                value={questions[index].option4} 
                onChange={(e) => updateQuestion(index, "option4" ,e.target.value)}
                placeholder='Enter option...'></Form.Control>
            </div>
        </Form.Group>

        <Form.Group controlId='quizCateg' className='mb-1 '>
        <Dropdown>
                <Dropdown.Toggle id="dropdown-basic" variant='outline-primary'>
                    {questions[index].answer === 0 ? "Answer" : questions[index].answer}
                </Dropdown.Toggle>

            <Dropdown.Menu>
                    <Dropdown.Item onClick={() => updateQuestion(index, "answer", 1)}>Option 1</Dropdown.Item>
                    <Dropdown.Item onClick={() => updateQuestion(index, "answer", 2)}>Option 2</Dropdown.Item>
                    <Dropdown.Item onClick={() => updateQuestion(index, "answer", 3)}>Option 3</Dropdown.Item>
                    <Dropdown.Item onClick={() => updateQuestion(index, "answer", 4)}>Option 4</Dropdown.Item>
            </Dropdown.Menu>
            </Dropdown>
        </Form.Group>

    </div>
  )
}
