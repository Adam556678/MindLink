import { createContext, useCallback, useState } from "react"

export const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
    const [registerInfo, setRegisterInfo] = useState({
        name: "",
        email: "",
        password: "",
        repeatPassword: ""
    })
    const [registerError, setRegisterError] = useState(null);

    const registerUser = useCallback((e) => {
        e.preventDefault();

    }, [registerInfo]);

    const updateRegisterInfo = useCallback((info) => {
        console.log(info);
        setRegisterInfo(info)
    }, []);

    return <AuthContext.Provider
        value={{registerUser,
            registerInfo,
            registerError,
            setRegisterError,
            updateRegisterInfo
        }}>
        {children}
    </AuthContext.Provider>
}