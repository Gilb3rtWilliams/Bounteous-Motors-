export const getToken = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return user?.token || null;
};

export const setToken = (token) => {
  if (!token) return;
  const user = JSON.parse(localStorage.getItem('user')) || {};
  const updatedUser = { ...user, token };
  localStorage.setItem('user', JSON.stringify(updatedUser));
};

export const removeToken = () => {
  localStorage.removeItem('user'); // removes the whole object
};

export const isAuthenticated = () => {
  return !!getToken();
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
