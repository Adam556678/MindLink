import React, { useContext } from 'react'
import { Form, Button, Card, Alert, Spinner } from "react-bootstrap";
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {

  const {
    updateLoginInfo,
    loginUser,
    loginError,
    loginInfo,
    loginLoading
  } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const success = await loginUser();

    if (success)
        navigate("/");
  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <Card className="col-sm-8 col-lg-4 col-md-6 p-4 shadow-lg rounded-4">
        <Card.Body>
          <Card.Title className="fw-bold mb-4 text-center fs-2">
            Login
          </Card.Title>

          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label className="fw-semibold">Email</Form.Label>
              <Form.Control 
                type="email" 
                placeholder="Enter your email" 
                className="py-2"
                onChange={e => {
                  updateLoginInfo({...loginInfo, email: e.target.value})
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label className="fw-semibold">Password</Form.Label>
              <Form.Control 
                type="password" 
                placeholder="Enter your password"
                className="py-2"
                onChange={e => {
                  updateLoginInfo({...loginInfo, password: e.target.value})
                }}
              />
            </Form.Group>

            <Button 
              variant="primary" 
              type="submit"
              className="w-25 py-2 rounded-4 fw-semibold d-block mx-auto"
              disabled={loginLoading}
            >
              {loginLoading ? <Spinner animation='border' style={{color:'white'}} /> : "Login"}
            </Button>

            <div className='d-flex justify-content-center mt-3 gap-1'>
                Don't have an account? <a href='/register' style={{textDecoration:'none'}}>Signup now</a>
            </div>

            {loginError ? <Alert variant='danger' className='mt-3'>
              <p>{loginError}</p>
            </Alert> : null}

          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}
