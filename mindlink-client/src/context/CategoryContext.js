import { createContext, useCallback, useState } from "react";
import { ENDPOINTS, getByIdRequest, getRequest } from "../api";

export const CategoryContext = createContext();

export const CategoryContextProvider = ({children}) => {
    const [categories, setCategories] = useState([]);
    const [catLoading, setCatLoading] = useState(false);
    const [quizzes, setQuizzes] = useState([]);

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

    const getCatQuizzes = useCallback(async (categId) => {
        setCatLoading(true);

        try {
            var response = await getByIdRequest(ENDPOINTS.category, categId);
            console.log(response);
        } catch (error) {
            console.log(error.message);
        }
        setCatLoading(false);
    }, []);

    return <CategoryContext.Provider value={{
        getCategories,
        categories,
        catLoading,
        getCatQuizzes
    }}>
        {children}
    </CategoryContext.Provider>
}
