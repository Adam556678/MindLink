import React from 'react'
import { Form, Button, Card, Alert } from "react-bootstrap";
import { AuthContext } from '../context/AuthContext';
import { useParams } from 'react-router-dom';

export default function VerifyOTP() {

  const {email} = useParams();

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <Card className="col-sm-8 col-lg-3 col-md-6 p-4 shadow-lg rounded-4">
        <Card.Body>
          <Card.Title className="fw-bold mb-4 text-center fs-2">
            Verify Your Email
          </Card.Title>

          {email ? <div className='mt-2 mb-3 text-center fs-7'>
            A verification code was sent to <div className='fw-semibold italic fs-8'>{email}</div> 
          </div> : null}

          <Form onSubmit={()=>{}}>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label className="fw-semibold">Code</Form.Label>
              <Form.Control 
                type="email" 
                placeholder="Enter the code" 
                className="py-2"
                onChange={e => {
                  
                }}
              />
            </Form.Group>

            <Button 
              variant="primary" 
              type="submit"
              className="w-25 py-2 rounded-4 fw-semibold d-block mx-auto"
            >
              Verify
            </Button>

            {/* {loginError ? <Alert variant='danger' className='mt-3'>
              <p>{loginError}</p>
            </Alert> : null} */}

          </Form>
        </Card.Body>
      </Card>
    </div>
  )
}
