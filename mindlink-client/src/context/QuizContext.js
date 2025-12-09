import { createContext, useCallback, useState } from "react";
import { validateQuiz } from "../utils/validateQuiz";
import { ENDPOINTS, getByIdRequest, getQuizResultsRequest, getRequest, postRequest } from "../api";

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
    const [myQuizzes, setMyQuizzes] = useState([]);
    const [isMyQuizzesLoading, setIsMyQuizzesLoading] = useState(false);
    const [quiz, setQuiz] = useState(null);
    const [fetchQuizError, setFetchQuizError] = useState(null);
    const [fetchQuizLoading, setFetchQuizLoading] = useState(false);
    const [submitLoading, setSubmitLoading] = useState(false);
    const [submitError, setSubmitError] = useState(null);
    const [quizResults, setQuizResults] = useState(null);
    const [quizResultsError, setQuizResultsError] = useState(null);
    const [quizResultsLoading, setQuizResultsLoading] = useState(false);


    const getMyQUizzes = useCallback(async () => {
        setIsMyQuizzesLoading(true);

        try {
            var response = await getRequest(ENDPOINTS.quiz);

            setMyQuizzes(response);
            setIsMyQuizzesLoading(false);
            console.log(response);

        } catch (error) {
            setIsMyQuizzesLoading(false);
            console.log(error.message);
        }
    }, []);

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

    const getQuizById = useCallback(async (quizId) => {
        setFetchQuizLoading(true);
        setFetchQuizError(null);
        
        try {
            var response = await getByIdRequest(ENDPOINTS.quiz, quizId);
            setQuiz(response);
        } catch (error) {
            console.log(error.message);
            setFetchQuizError(error.message);
        }
        setFetchQuizLoading(false);
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
            return response;
        } catch (error) {
            setQuizError({internal:error.message});
            console.log(error.message);
        }
    }, [quizInfo, questions]);

    const submitQuiz = useCallback(async (result) => {
        setSubmitLoading(true);
        setSubmitError(null)

        try {
            var response = await postRequest(ENDPOINTS.result, result);
            return response
        } catch (error) {
            console.log(error.message);
            setSubmitError(error.message);
            return null;
        } finally{
            setSubmitLoading(false);
        }

    }, []);

    const getResults = useCallback(async (resId) => {
        try {
            var response = await getByIdRequest(ENDPOINTS.result, resId);
            return response;
        } catch (error) {
            console.log(error);
        }
    }, []);

    const getQuizResults = useCallback(async (quizId) => {
        setQuizResultsLoading(true);
        setQuizResultsError(null);
        
        try {
            var response = await getQuizResultsRequest(quizId);
            setQuizResults(response);
        } catch (error) {
            console.log(error.message);
            setQuizResultsError(error.message);
        }

        setQuizResultsLoading(false);
    }, []);

    return <QuizContext.Provider value={{
        quizInfo, 
        updateQuizInfo, 
        questions,
        addQuestion,
        removeQuestion,
        updateQuestion,
        createQuiz,
        quizError,
        getMyQUizzes,
        myQuizzes,
        isMyQuizzesLoading,
        getQuizById,
        fetchQuizError,
        quiz,
        fetchQuizLoading,
        submitQuiz,
        submitLoading,
        submitError,
        getResults,
        getQuizResults,
        quizResults,
        quizResultsError,
        quizResultsLoading
        }}>
        {children}
    </QuizContext.Provider>
}