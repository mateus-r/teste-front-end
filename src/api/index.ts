import axios from 'axios';

const API_KEY = 'AIzaSyAxFueZOkePYzDEujiK2LxCODrNL5hHJUA';

export const youtubeApi = axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3',
    params: {
        key: API_KEY
    }
});