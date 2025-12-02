import { createContext, useCallback, useState } from "react";

export const CategoryContext = createContext();

export const CategoryContextProvider = ({children}) => {
    const [categories, setCategories] = useState([]);

    

    return <CategoryContext.Provider value={{}}>
        {children}
    </CategoryContext.Provider>
}
