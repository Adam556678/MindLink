import React, { useContext } from 'react'
import { Form, Button, Card } from "react-bootstrap";
import { AuthContext } from '../context/AuthContext';

export default function Register() {
    const {
        registerUser, 
        registerInfo, 
        updateRegisterInfo,
        registerError
        } = useContext(AuthContext);

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <Card className="col-sm-8 col-lg-4 col-md-6 p-4 shadow-lg rounded-4">
        <Card.Body>
          <Card.Title className="fw-bold mb-4 text-center fs-2">
            Register
          </Card.Title>

          <Form onSubmit={registerUser}>
            
            <Form.Group className='mb-3 ' controlId='formName'>
                <Form.Label className='fw-semibold'>Name</Form.Label>
                <Form.Control type='text' placeholder='Enter your name' 
                    onChange={ (e) => updateRegisterInfo({
                        ...registerInfo, name: e.target.value
                    })}/>
            </Form.Group>
            
            <Form.Group className='mb-3 ' controlId='formEmail'>
                <Form.Label className='fw-semibold'>Email</Form.Label>
                <Form.Control type='email' placeholder='Enter your email' 
                    onChange={(e) => {
                        updateRegisterInfo({...registerInfo, email: e.target.value})
                    }} />
            </Form.Group>
            
            <Form.Group className='mb-3 ' controlId='formPassword'>
                <Form.Label className='fw-semibold'>Password</Form.Label>
                <Form.Control type='password' placeholder='Enter your password' 
                    onChange={(e) => {
                        updateRegisterInfo({...registerInfo, password: e.target.value})
                    }} />
            </Form.Group>
            
            <Form.Group className='mb-3 ' controlId='formRepeatPassword'>
                <Form.Label className='fw-semibold'>Repeat Password</Form.Label>
                <Form.Control type='password' placeholder='Enter your password' 
                   onChange={(e) => {
                    updateRegisterInfo({...registerInfo, repeatPassword: e.target.value})
                   }} />
            </Form.Group>
            
            <Button 
              variant="primary" 
              type="submit"
              className="w-25 py-2 rounded-4 fw-semibold d-block mx-auto"
            >
              Register
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}
