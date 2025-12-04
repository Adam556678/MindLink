import { createContext, useCallback, useState } from "react";
import { ENDPOINTS, getByIdRequest, getCategoryQuizzesRequest, getRequest } from "../api";

export const CategoryContext = createContext();

export const CategoryContextProvider = ({children}) => {
    const [categories, setCategories] = useState([]);
    const [catLoading, setCatLoading] = useState(false);
    const [quizzes, setQuizzes] = useState([]);
    const [category, setCategory] = useState(null);
    const [filteredQuizzes, setFilteredQuizzes] = useState([]);

    const getCategories = useCallback(async () => {
        setCatLoading(true);

        try {
            var response = await getRequest(ENDPOINTS.category)            
            setCategories(response)
        } catch (error) {
            console.log(error.message);
        }
        setCatLoading(false)
    }, []);

    const getCategoryById = useCallback(async (id) => {
        setCatLoading(true);

        try {
            var response = await getByIdRequest(ENDPOINTS.category, id)            
            setCategory(response);
        } catch (error) {
            console.log(error.message);
        }
        setCatLoading(false)
    }, []);

    const getCatQuizzes = useCallback(async (categId) => {
        setCatLoading(true);

        try {
            var response = await getCategoryQuizzesRequest(categId);
            setQuizzes(response);
            setFilteredQuizzes(response);
        } catch (error) {
            console.log(error.message);
        }
        setCatLoading(false);
    }, []);

    const search = useCallback((text)=>{
        if (!text.trim()) {
            // empty → show all quizzes again
            setFilteredQuizzes(quizzes);
            return;
    }

        var results = quizzes.filter(q => 
            q.title.toLowerCase().includes(text.toLowerCase())
        );
        setFilteredQuizzes(results);
    }, [quizzes]);

    return <CategoryContext.Provider value={{
        getCategories,
        categories,
        catLoading,
        getCatQuizzes,
        quizzes,
        getCategoryById,
        category,
        search,
        filteredQuizzes
    }}>
        {children}
    </CategoryContext.Provider>
}
