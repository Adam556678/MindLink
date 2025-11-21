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

    const registerUser = useCallback(async (e) => {
        e.preventDefault();

        setRegisterError(null);

        if (registerInfo.password !== registerInfo.repeatPassword){
            console.log("Passwords aren't matched");
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
            updateRegisterInfo
        }}>
        {children}
    </AuthContext.Provider>
}