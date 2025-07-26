export default {
    /**
     * @param {string} message
     * @param {...any} optionalParams
     */
    d: (message) => {
        console.log(`[DEBUG] ${message}`);
    },

    /**
     * @param {string} message
     * @param {...any} optionalParams
     */
    e: (message) => {
        console.error(`[ERROR] ${message}`);
    }
}