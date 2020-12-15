const axios = require('axios');

module.exports = axios.create({
    baseURL: process.env.BASE_URL,
    timeout: 10000,
    params: {
        api_key: process.env.API_TOKEN
    }
});
