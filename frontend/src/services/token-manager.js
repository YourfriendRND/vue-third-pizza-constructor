const AUTH_TOKEN_NAME = 'vue-pizza-auth-key';

export const getToken = () => localStorage.getItem(AUTH_TOKEN_NAME);

export const saveToken = () => localStorage.setItem(AUTH_TOKEN_NAME);

export const removeToken = () => localStorage.removeItem(AUTH_TOKEN_NAME);
