import axios from 'axios';

const API_KEY = 'AIzaSyDU0tXN1GW-zlYD5bhvTB2sEYHpJc1SuZA';

export const youtubeApi = axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3',
    params: {
        key: API_KEY
    }
});

export const thumbnailApi = axios.create({
    baseURL: 'https://i.ytimg.com/vi',
});