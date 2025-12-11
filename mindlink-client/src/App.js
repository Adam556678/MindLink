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

function App() {
  const { user } = useContext(AuthContext);

  return (
    <QuizContextProvider>
      <BrowserRouter>
        <AppContent user={user} />
      </BrowserRouter>
    </QuizContextProvider>
  );
}

function AppContent({ user }) {
  const location = useLocation();

  const hideNavBarOn = ["/login", "/register"];
  const shouldHideNavBar = hideNavBarOn.includes(location.pathname);

  return (
    <>
      {!shouldHideNavBar && <NavBar />}

      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/' element={user ? <Home /> : <Login />} />
        <Route path='/add-quiz' element={<AddQuiz />} />
        <Route path='/quiz-success' element={<QuizSuccess />} />
        <Route path='/your-quizzes' element={<YourQuizzes />} />
        <Route path='/category/:id' element={<Category />} />
        <Route path='/quiz/:id' element={<Quiz />} />
        <Route path='/quiz/:quizId/results/:resId' element={<Result />} />
        <Route path='/quiz/:quizId/results' element={<QuizResults />} />
        <Route path='/quizzes-taken' element={<QuizzesYouTook />} />
      </Routes>
    </>
  );
}


export default App;
