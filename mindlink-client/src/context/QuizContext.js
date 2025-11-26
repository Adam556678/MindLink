import { createContext, useCallback, useState } from "react";

export const QuizContext = createContext();

export const QuizContextProvider = ({children}) => {
    const [quizInfo, setQuizInfo] = useState({
        title: '',
        access: '',
        category: ''
    });
    
    const [questions, setQuestions] = useState([{
            text: '',
            option1: '', 
            option2: '', 
            option3: '', 
            option4: '',
            answer: 0 
        }]);

    const addQuestion = useCallback((qstn) => {
        setQuestions(prev => [...prev, qstn]);
    }, []);

    const removeQuestion = useCallback((indx) => {
        setQuestions(prev => prev.filter((_, i) => i !== indx));
    }, []);

    const updateQuestion = useCallback((indx, field, val) => {
        setQuestions(
            prev => prev.map((q, i)=> (i === indx ? {...q, [field]:val} : q))
        );
    }, []);

    const updateQuizInfo = useCallback((info)=> {
        setQuizInfo(prev => ({...prev, ...info}));
    }, []);

    return <QuizContext.Provider value={{
        quizInfo, 
        updateQuizInfo, 
        questions,
        addQuestion,
        removeQuestion,
        updateQuestion
        }}>
        {children}
    </QuizContext.Provider>
}