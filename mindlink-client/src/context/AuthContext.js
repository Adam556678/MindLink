import { createContext, useCallback, useEffect, useState } from "react"
import { ENDPOINTS, getRequest, postRequest } from "../api";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
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


    useEffect(() => {
        async function fetchUser() {
            try {
                var response = await getRequest(ENDPOINTS.me);
                setUser(response)
                console.log(response);
            } catch (error) {
                console.log(error);
            }finally{
                setLoading(false);
            }
        }

        fetchUser()
    }, []);


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
        if(e) e.preventDefault();

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
            return request;
        } catch (error) {
            console.log(error.message);
            setRegisterError(error.message);
            return null;
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
            loginError,
            user,
            loading
        }}>
        {children}
    </AuthContext.Provider>
}