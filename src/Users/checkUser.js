import {giteaInstance} from "../axios";

export const checkUser = async (username) => {
    return await giteaInstance.get('/user', {
        params: {
            'sudo': username,
        }
    }).then(response => {
        return Promise.resolve(true)
    }, reject => {
        return Promise.resolve(false)
    })

}
