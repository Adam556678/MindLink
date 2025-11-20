import React from 'react'
import { Form, Button, Card } from "react-bootstrap";

export default function Login() {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <Card className="col-sm-8 col-lg-4 col-md-6 p-4 shadow-lg rounded-4">
        <Card.Body>
          <Card.Title className="fw-bold mb-4 text-center fs-2">
            Login
          </Card.Title>

          <Form>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label className="fw-semibold">Email</Form.Label>
              <Form.Control 
                type="email" 
                placeholder="Enter your email" 
                className="py-2"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label className="fw-semibold">Password</Form.Label>
              <Form.Control 
                type="password" 
                placeholder="Enter your password"
                className="py-2"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formCheck">
              <Form.Check label="Remember me" />
            </Form.Group>

            <Button 
              variant="primary" 
              type="submit"
              className="w-25 py-2 rounded-4 fw-semibold d-block mx-auto"
            >
              Login
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}
