import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Routes, Route, useLocation} from "react-router-dom";
import Login from './pages/Login';
import Register from './pages/Register';
import NavBar from './components/NavBar';
import "bootstrap-icons/font/bootstrap-icons.css";
import Home from './pages/Home';
import AddQuiz from './pages/AddQuiz';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import { QuizContextProvider } from './context/QuizContext';
import QuizSuccess from './pages/QuizSuccess';
import YourQuizzes from './pages/YourQuizzes';
import Category from './pages/Category';
import Quiz from './pages/Quiz';
import Result from './pages/Results';
import QuizResults from './pages/QuizResults';
import QuizzesYouTook from './pages/QuizzesYouTook';
import PrivateRoute from './components/PrivateRoute';

function App() {

  return (
    <QuizContextProvider>
      <BrowserRouter>
        <AppContent/>
      </BrowserRouter>
    </QuizContextProvider>
  );
}

function AppContent() {
  const location = useLocation();

  const hideNavBarOn = ["/login", "/register"];
  const shouldHideNavBar = hideNavBarOn.includes(location.pathname);

  return (
    <>
      {!shouldHideNavBar && <NavBar />}

      <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />


        {/* Protected Routes */}
          <Route path='/' element={<PrivateRoute><Home /></PrivateRoute> } />
          <Route path='/add-quiz' element={<PrivateRoute><AddQuiz /></PrivateRoute>} />
          <Route path='/quiz-success' element={<PrivateRoute><QuizSuccess /></PrivateRoute>} />
          <Route path='/your-quizzes' element={<PrivateRoute><YourQuizzes /></PrivateRoute>} />
          <Route path='/category/:id' element={<PrivateRoute><Category /></PrivateRoute>} />
          <Route path='/quiz/:id' element={<PrivateRoute><Quiz /></PrivateRoute>} />
          <Route path='/quiz/:quizId/results/:resId' element={<PrivateRoute><Result /></PrivateRoute>} />
          <Route path='/quiz/:quizId/results' element={<PrivateRoute><QuizResults /></PrivateRoute>} />
          <Route path='/quizzes-taken' element={<PrivateRoute><QuizzesYouTook /></PrivateRoute>} />
        </Routes>
    </>
  );
}


export default App;