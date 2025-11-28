import { createContext, useCallback, useState } from "react";
import { validateQuiz } from "../utils/validateQuiz";
import { ENDPOINTS, postRequest } from "../api";

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

    const [quizError, setQuizError] = useState(null);

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

    const createQuiz = useCallback(async () => {
        setQuizError(null);

        // validate quiz
        const errors = validateQuiz(quizInfo, questions);

        if (Object.keys(errors).length > 0){
            setQuizError(errors)
            console.log(errors);
            return ;
        }

        try {
            // create request
            var reqBody = {
                ...quizInfo,
                questions: questions
            }
            var response = await postRequest(ENDPOINTS.quiz, reqBody);
            console.log(response);
        } catch (error) {
            setQuizError({internal:error.message});
            console.log(error.message);
        }
    }, [quizInfo, questions]);

    return <QuizContext.Provider value={{
        quizInfo, 
        updateQuizInfo, 
        questions,
        addQuestion,
        removeQuestion,
        updateQuestion,
        createQuiz,
        quizError
        }}>
        {children}
    </QuizContext.Provider>
}