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
    const [loginLoading, setLoginLoading] = useState(false);
    const [verifyLoading, setVerifyLoading] = useState(false);
    const [verifyError, setVerifyError] = useState(null);


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

    const loginUser = useCallback(async () => {
        setLoginLoading(true);
        setLoginError(null);
        
        try {
            await postRequest(ENDPOINTS.login, loginInfo);        
            var response = await getRequest(ENDPOINTS.me);
            setUser(response)
            return true;
        } catch (error) {
            console.log(error.message);
            setLoginError(error.message);
            return false;
        }finally{
            setLoginLoading(false);
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
            return response;
        } catch (error) {
            console.log(error.message);
            setRegisterError(error.message);
            return null;
        }
    }, [registerInfo]);

    const verifyEmail = useCallback(async (otp, token) => {
        setVerifyLoading(true);
        setVerifyError(null);

        const request = {
            code: otp,
            verifyToken: token
        }

        try {
            var response = await postRequest(ENDPOINTS.verifyEmail, request);            
            console.log(response);
            return true;
        } catch (error) {
            console.log(error.message);
            setVerifyError(error.message);
            return false;
        }finally {
            setVerifyLoading(false);
        }
    }, []);

    const updateRegisterInfo = useCallback((info) => {
        setRegisterInfo(info)
    }, []);

    const logout = useCallback(async ()=>{
        try {
            var response = postRequest(ENDPOINTS.logout, null);
            return true;
        } catch (error) {
            return false;
        }
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
            loginLoading,
            user,
            loading,
            verifyEmail,
            verifyLoading,
            verifyError,
            logout
        }}>
        {children}
    </AuthContext.Provider>
}