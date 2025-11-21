import { createContext, useCallback, useState } from "react"
import { ENDPOINTS, postRequest } from "../api";

export const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
    const [registerInfo, setRegisterInfo] = useState({
        name: "",
        email: "",
        password: "",
        repeatPassword: ""
    })
    const [registerError, setRegisterError] = useState(null);
    
    const [loginInfo, setLoginInfo] = useState({
        email: "",
        password: ""
    });
    const [loginError, setLoginError] = useState(null);

    const updateLoginInfo = useCallback((info) => {
        setLoginInfo(info)
    }, []);

    const loginUser = useCallback(async (e) => {
        e.preventDefault();

        setLoginError(null);
        
        try {
            var response = await postRequest(ENDPOINTS.login, loginInfo);        
            console.log(response);
        } catch (error) {
            console.log(error.message);
            setLoginError(error.message);
        }

    }, [loginInfo]);

    const registerUser = useCallback(async (e) => {
        e.preventDefault();

        setRegisterError(null);

        if (registerInfo.password !== registerInfo.repeatPassword){
            return setRegisterError("Passwords are not matched");
        }

        var request = {
            name: registerInfo.name,
            email: registerInfo.email,
            password: registerInfo.password
        };

        try {
            var response = await postRequest(ENDPOINTS.register, request);
            console.log(response);
        } catch (error) {
            console.log(error.message);
            setRegisterError(error.message);
        }
    }, [registerInfo]);

    const updateRegisterInfo = useCallback((info) => {
        setRegisterInfo(info)
    }, []);

    return <AuthContext.Provider
        value={{registerUser,
            registerInfo,
            registerError,
            setRegisterError,
            updateRegisterInfo,
            loginInfo,
            updateLoginInfo,
            loginUser,
            loginError
        }}>
        {children}
    </AuthContext.Provider>
}