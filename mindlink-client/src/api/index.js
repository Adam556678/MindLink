const BASE_URL = "http://localhost:5116";

export const ENDPOINTS = {
    register: 'auth/register',
    login: 'auth/login',
    me: 'auth/me',
    quiz: 'quiz',
    category: 'category'
};


export const postRequest = async (endpoint, request) => {
    const url = BASE_URL + '/api/' + endpoint + '/';
    
    var response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(request),
        credentials: "include"
    });
    
    if (!response.ok){
        const errorData = await response.json().catch(()=>({}));
        throw {
            status: response.status,
            message: errorData.message || "Something went wrong"
        };
    }
    
    return await response.json(); //returns response body
}

export const getRequest = async (endpoint) => {
    const url = BASE_URL + '/api/' + endpoint + '/';
    
    var response = await fetch(url, {
        method: "GET",
        credentials: "include"
    });
    
    if (!response.ok){
        const errorData = await response.json().catch(()=>({}));
        throw {
            status: response.status,
            message: errorData.message || "Something went wrong"
        };
    }
    
    return await response.json(); //returns response body
}

export const getByIdRequest = async (endpoint, id) => {
    const url = BASE_URL + '/api/' + endpoint + '/' + id;
    
    var response = await fetch(url, {
        method: "GET",
        credentials: "include"
    });
    
    if (!response.ok){
        const errorData = await response.json().catch(()=>({}));
        throw {
            status: response.status,
            message: errorData.message || "Something went wrong"
        };
    }
    
    return await response.json(); //returns response body
}