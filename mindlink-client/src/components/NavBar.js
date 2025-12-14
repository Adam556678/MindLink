import React, { useContext, useState } from "react";
import { Navbar, Container, Button, Form, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Drawer from '@mui/material/Drawer';
import "./NavBar.css";
import { useNavigate } from "react-router-dom";
import { useQuizSearch } from "../hooks/useQuizSearch";

export default function NavBar() {

  const {user, logout} = useContext(AuthContext); 
  
  const [open, setOpen] = useState(false);

  const [quizCode, setQuizCode] = useState("");
  const {searchByCode,
        loading} = useQuizSearch();

  const navigate = useNavigate();
  
  const toggleDrawer = (openDrawer) => {
    setOpen(openDrawer);
  }

  const handleNavigation = (route) => {
    setOpen(false);
    navigate(route);
  } 

  const handleLogout = async () => {
    const success = await logout();
    if (success)
      navigate('/login');
  }

  return (
    <>
      <Navbar bg="primary" className="px-3 py-2" style={{height:"65px", position:'fixed', top: 0,
    left: 0,
    right: 0,
    zIndex: 1000}}>
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
            onChange={e => {setQuizCode(e.target.value)}}
            />

            <Button
            variant="light"
            className="fw-semibold d-none d-lg-inline"
            disabled={loading}
            style={{
                borderRadius: "0 20px 20px 0", // right rounded only
                border: "none",
                height: "38px",
            }}
            onClick={()=>searchByCode(quizCode)}
            >
            GO
            </Button>  
            
            {loading ? <Spinner animation="border" style={{color:'white'}} />  : null}
            
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
          <Button
            onClick={() => toggleDrawer(true)}
          >
            <i className="bi bi-list fs-3"></i>
          </Button>
        </div>

      </Container>
    </Navbar>

    {/* Global Drawer */}
      <Drawer 
        open={open} 
        onClose={() => toggleDrawer(false)}
        anchor="right"
        sx={{
        '& .MuiDrawer-paper': {
        width: '20%',
        height: '100%',
        display:'flex',
        flexDirection:'column',
        justifyContent:'space-between'
        // backgroundColor:"#ddd"
        }
    }}
    >
        <div>
          <div className="createQuiz d-flex gap-2 align-items-center justify-content-center" 
            onClick={()=>handleNavigation("/add-quiz")}
          >
            <i class="bi bi-pencil-fill"></i>
            <span >Create a Quiz</span>
          </div>


          <div className="drawer-item">
            <i class="bi bi-person-fill"></i>
            <span className="drawer-item-text">Profile</span>
            <div className="coming-soon">
              Coming Soon..
            </div>
          </div>
          <div className="drawer-item" onClick={()=>handleNavigation("/your-quizzes")}>
            <i class="bi bi-lightbulb-fill"></i>
            <span className="drawer-item-text">My Quizzes</span>
          </div>
          <div className="drawer-item" onClick={()=>handleNavigation("/quizzes-taken")}>
            <i class="bi bi-clock-history"></i>
            <span className="drawer-item-text">Quizzes I took</span>
          </div>
        </div>

        <div>
          <div className="drawer-item mb-3" onClick={() => handleLogout()}>
            <i class="bi bi-box-arrow-right"></i>
            <span className="drawer-item-text">Log Out</span>
          </div>

        </div>

    </Drawer>

    </>
    
  );
}
