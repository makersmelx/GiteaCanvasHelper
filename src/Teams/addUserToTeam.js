import {giteaInstance} from "../axios";

export const addUserToTeam = async (username, organization, teamName) => {
    const response = (await giteaInstance.get(`/orgs/${organization}/teams/search`, {
        params: {
            q: teamName
        }
    }))
    const queryList = response.data.data;
    if (queryList.length === 0) {
        console.error(`Team ${teamName} does not exist.`)
        return;
    }
    const id = queryList[0].id;
    await giteaInstance.put(`/teams/${id.toString()}/members/${username}`)
        .then(response => {
                // console.log(`Successfully added ${username} into ${organization}/${teamName}`);
            }, error => {
                console.error(error);
            }
        )
}
