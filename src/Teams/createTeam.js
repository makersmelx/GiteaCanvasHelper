import {giteaInstance} from "../axios";

/**\
 * Create a team in an organization
 * @param organization {string} organization name
 * @param team {string} name of the team that you would like to create
 * @returns {number} id of the team if success, -1 if fail
 */
export const createTeam = async (organization, team) => {
    return await giteaInstance.post(`/orgs/${organization}/teams`, {
        "description": 'empty',
        "includes_all_repositories": false,
        "name": team,
        "permission": "write",
        "units": [
            "repo.code",
            "repo.issues",
            "repo.wiki",
            "repo.pulls",
            "repo.releases",
        ]
    }).then(response => {
            // console.log(`Successfully created ${team} for Organization ${organization}`);
            return Promise.resolve(response.data.id);
        }, error => {
            // console.error(error.response.data.message);
            return Promise.resolve(-1);
        }
    )
}
