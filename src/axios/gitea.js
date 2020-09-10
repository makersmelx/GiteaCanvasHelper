import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();
export const giteaInstance = axios.create({
    baseURL: process.env.DEBUG ===1 ? process.env.LOCAL_URL : process.env.BASE_URL,
    headers: {
        "Authorization": `token ${process.env.DEBUG === 1 ? process.env.LOCAL_TOKEN : process.env.TOKEN}`,
    }
})
