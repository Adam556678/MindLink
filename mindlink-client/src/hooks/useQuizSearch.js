import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getQuizByCodeRequest } from "../api";

export function useQuizSearch() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const searchByCode = async (code) => {

        if (!code?.trim()) return;

        setLoading(true);
        
        try {
            var quizId = await getQuizByCodeRequest(code);
            navigate(`/quiz/${quizId}`);
        } catch (error) {
            console.log(error.message);            
            alert(error.message);
        } finally {
            setLoading(false);
        }
    }

    return { 
        searchByCode,
        loading
    };
}