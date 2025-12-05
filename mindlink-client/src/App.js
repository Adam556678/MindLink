import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
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

function App() {

  const {user} = useContext(AuthContext);

  return (
    <QuizContextProvider>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/home' element={<Home />} />
          <Route path='/add-quiz' element={<AddQuiz />} />
          <Route path='/quiz-success' element={<QuizSuccess />} />
          <Route path='/your-quizzes' element={<YourQuizzes />} />
          <Route path='/category/:id' element={<Category />} />
          <Route path='/quiz/:id' element={<Quiz />} />
        </Routes>
      </BrowserRouter>
    </QuizContextProvider>

  );
}

export default App;
