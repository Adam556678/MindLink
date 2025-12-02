import { createContext, useCallback, useState } from "react";
import { ENDPOINTS, getRequest } from "../api";

export const CategoryContext = createContext();

export const CategoryContextProvider = ({children}) => {
    const [categories, setCategories] = useState([]);
    const [catLoading, setCatLoading] = useState(false);

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

    return <CategoryContext.Provider value={{
        getCategories,
        categories
    }}>
        {children}
    </CategoryContext.Provider>
}
