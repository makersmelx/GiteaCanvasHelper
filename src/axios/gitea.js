import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();
export const giteaInstance = axios.create({
    baseURL: process.env.GITEA_BASE_URL,
    headers: {
        "Authorization": `token ${process.env.GITEA_TOKEN}`,
    }
})

// export const giteaInstance = axios.create({
//     baseURL: process.env.LOCAL_URL,
//     headers: {
//         "Authorization": `token ${process.env.LOCAL_GITEA_TOKEN}`,
//     }
// })
