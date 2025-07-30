import apiClient from "./api.client.js";

const saveUser = (res) => {
    localStorage.setItem('user', JSON.stringify(res.data.user));
}

const repository = {

    signIn: (body) => {
        return apiClient.post('/auth/sign-in', body)
            .then(res => saveUser(res));
    },

    signUp: (body) => {
        return apiClient.post('/auth/sign-up', body)
            .then(res => saveUser(res));
    },

    signOut: (body) => {
        return apiClient.post('/auth/sign-out', body)
            .then(res => localStorage.removeItem("user"));
    }
}

export default repository;