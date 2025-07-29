import apiClient from "./api.client.js";

const repository = {
    signIn: (body) => apiClient.post('/auth/sign-in', body),
    
    signUp: (body) => apiClient.post('/auth/sign-up', body),
}

export default repository;