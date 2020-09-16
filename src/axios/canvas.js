import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();
const readlineSync = require('readline-sync');
const canvasToken = process.env.CANVAS_TOKEN || readlineSync.question('Type in your canvas token:\n');
export const canvasInstance = axios.create({
    baseURL: process.env.CANVAS_BASE_URL,
    params: {
        access_token: canvasToken,
        per_page:1000,
    }
})
