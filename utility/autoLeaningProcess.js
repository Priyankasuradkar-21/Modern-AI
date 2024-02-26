const axios = require('axios');
require('dotenv').config();

const autoLearningProcess = async (query) => {
    try {
        const response = await axios.get(`https://serpapi.com/search.json?engine=duckduckgo&q=${query}&kl=us-en&api_key=${process.env.apiKey}`);
        return response.data.organic_results[1].snippet;
    } catch (err) {
        console.log('ERROR ::: ', err);
        return res.status(500).json({
            success: false,
            message: 'Something went wrong, Please try again later'
        })
    }
}

module.exports = autoLearningProcess;