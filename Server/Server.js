const express = require('express');
const cors = require('cors');
require('dotenv').config();
const bodyParser = require('body-parser');
const axios = require('axios');

const uri = process.env.CONNECTION_STRING;

const app = express();
const port = process.env.PORT || 4000;


app.use(bodyParser.json());
app.use(cors());



app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on port ${port}`);
});


app.get('/countries', (req, res) => {
    res.json({ status: 'success', message: 'Countries data fetched successfully' });
});


app.post('/news', async (req, res) => {
    let newsData = [];
    let country = 'us'; // Default to 'us' if geolocation fails
    const url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=${process.env.NEWS_API_KEY}`;
    const geoUrl = 'http://ip-api.com/json/';

    try {
        const geoResponse = await axios.get(geoUrl);
        country = geoResponse.data.countryCode.toLowerCase();
    } catch (error) {
        console.error("Error fetching server location:", error);
    }


    try {
        const response = await axios.get(url);
        newsData = response.data.articles;
        res.status(200).json({ status: 'success', news: newsData });
    } catch (error) {
        // console.error("Error fetching news:", error);
        res.status(500).json({ status: 'error', message: 'An error occurred while fetching news' });
    }
});

app.get('/profile', (req, res) => {
    res.json({ status: 'success', message: 'Profile data fetched successfully' });
});
