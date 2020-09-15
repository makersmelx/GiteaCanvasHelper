import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();
const readlineSync = require('readline-sync');
const giteaToken = process.env.GITEA_TOKEN || readlineSync.question('Type in your gitea token:\n');
const local = process.env.CONNECTION ? process.env.CONNECTION.toLowerCase() === 'local' : false;
const remoteGiteaInstance = axios.create({
    baseURL: process.env.GITEA_BASE_URL,
    headers: {
        "Authorization": `token ${giteaToken}`,
    }
})

const localGiteaInstance = axios.create({
    baseURL: process.env.LOCAL_GITEA_URL,
    headers: {
        "Authorization": `token ${process.env.LOCAL_GITEA_TOKEN}`,
    }
})

export const giteaInstance = local ? localGiteaInstance : remoteGiteaInstance;