import apiClient from "./api.client.js";

const repository = {

    getUsers: (sortBy, sortAsc) => apiClient.get('/user/list')
}

export default repository;