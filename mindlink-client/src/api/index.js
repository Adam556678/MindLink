const BASE_URL = "http://localhost:5116";

export const ENDPOINTS = {
    register: 'auth/register',
    login: 'auth/login',
    me: 'auth/me',
    quiz: 'quiz',
    category: 'category',
    result: 'result',
    verifyEmail : 'auth/verify',
    logout: 'auth/logout'
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

export const getCategoryQuizzesRequest = async (categoryId) => {
    const url = `${BASE_URL}/api/category/${categoryId}/quizzes`;

    const response = await fetch(url, {
        method: "GET",
        credentials: "include"
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw {
            status: response.status,
            message: errorData.message || "Something went wrong"
        };
    }

    return await response.json();
};

export const getQuizResultsRequest = async (quizId) => {
    const url = `${BASE_URL}/api/quiz/${quizId}/results`;

    const response = await fetch(url, {
        method: "GET",
        credentials: "include"
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw {
            status: response.status,
            message: errorData.message || "Something went wrong"
        };
    }

    return await response.json();    
}

export const getQuizByCodeRequest = async (code) => {
    const url = `${BASE_URL}/api/quiz/find/${code}`;

    const response = await fetch(url, {
        method: "GET",
        credentials: "include"
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw {
            status: response.status,
            message: errorData.message || "Something went wrong"
        };
    }

    return await response.json();    
}
