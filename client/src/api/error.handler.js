const apiErrorHandler = (err) => {
    if (err.response) {
        return err.response.data;
    } else {
        return { message: err.message };
    }
}

export default apiErrorHandler;