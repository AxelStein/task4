import { LOCAL_USER } from "../constants.js";
import apiClient from "./api.client.js";

const saveUser = (res) => {
    localStorage.setItem(LOCAL_USER, JSON.stringify(res.data.user));
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

    signOut: () => {
        return apiClient.post('/auth/sign-out')
            .then(res => localStorage.removeItem(LOCAL_USER));
    }
}

export default repository;