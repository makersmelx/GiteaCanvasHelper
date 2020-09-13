import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();
export const canvasInstance = axios.create({
    baseURL: process.env.CANVAS_BASE_URL,
    params: {
        access_token: process.env.CANVAS_TOKEN
    }
})
