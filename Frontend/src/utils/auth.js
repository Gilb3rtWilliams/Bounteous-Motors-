export const getToken = () => {
    return localStorage.getItem('token');
};

export const setToken = (token) => {
    if (!token) return;
    localStorage.setItem('token', token);
};

export const removeToken = () => {
    localStorage.removeItem('token');
};

export const isAuthenticated = () => {
    const token = getToken();
    return !!token;
};

export const parseJwt = (token) => {
    try {
        return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
        console.error("Failed to parse JWT:", e);
        return null;
    }
};

export const isTokenValid = () => {
    const token = getToken();
    if (!token) return false;
    
    const decodedToken = parseJwt(token);
    if (!decodedToken) return false;
    
    const currentTime = Date.now() / 1000;
    return decodedToken.exp > currentTime;
};