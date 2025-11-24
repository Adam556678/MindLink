import React, { useContext } from "react";
import { Navbar, Container, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function NavBar() {

  const {user} = useContext(AuthContext); 

  return (
    <Navbar bg="primary" className="px-3 py-2" style={{height:"65px"}}>
      {/* <Container fluid className="d-flex justify-content-between align-items-center"> */}
      <Container fluid className="justify-content-start position-relative">

        {/* LEFT: Brand + Input + Button */}
        <div className="d-flex align-items-center gap-2">
          <h2 className="m-0 me-4">
            <Link to="/" className="link-light text-decoration-none">
              <i className="bi bi-pencil me-2 fs-3"></i>
              MindLink
            </Link>
          </h2>

          <Form.Control
            placeholder="Enter Code..."
            className="d-none d-lg-inline"
            style={{
                borderRadius: "20px 0 0 20px", // left rounded only
                height: "38px",
                width: "150px",
                border: "none",
                paddingLeft: "15px",
            }}
            />

            <Button
            variant="light"
            className="fw-semibold d-none d-lg-inline"
            style={{
                borderRadius: "0 20px 20px 0", // right rounded only
                border: "none",
                height: "38px",
            }}
            >
            GO
            </Button>      
        </div>

        {/* CENTER: User Info */}
        {/* <div className="d-flex align-items-center text-white fw-semibold fs-5 gap-2"> */}
        <div className="d-flex align-items-center text-white fw-semibold fs-5 gap-2 
        position-absolute start-50 translate-middle-x">
          <i className="bi bi-person-fill fs-4"></i>
          {user?.name}
        </div>

        {/* RIGHT: Menu Button */}
        <div className="d-flex align-items-center position-absolute end-0">
          <Button>
            <i className="bi bi-list fs-3"></i>
          </Button>
        </div>

      </Container>
    </Navbar>
  );
}
