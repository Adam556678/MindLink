import { createContext, useCallback, useState } from "react";
import { ENDPOINTS, getByIdRequest, getCategoryQuizzesRequest, getRequest } from "../api";

export const CategoryContext = createContext();

export const CategoryContextProvider = ({children}) => {
    const [categories, setCategories] = useState([]);
    const [catLoading, setCatLoading] = useState(false);
    const [quizzes, setQuizzes] = useState([]);
    const [category, setCategory] = useState(null);

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
            setCategory(response)
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
        } catch (error) {
            console.log(error.message);
        }
        setCatLoading(false);
    }, []);

    return <CategoryContext.Provider value={{
        getCategories,
        categories,
        catLoading,
        getCatQuizzes,
        quizzes,
        getCategoryById,
        category
    }}>
        {children}
    </CategoryContext.Provider>
}
