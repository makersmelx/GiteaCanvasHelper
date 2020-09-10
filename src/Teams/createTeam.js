import {giteaInstance} from "../axios";

export const createTeam = async (organization, team) => {
    await giteaInstance.post(`/orgs/${organization}/teams`, {
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
            console.log(`Successfully created ${team} for Organization ${organization}`);
        }, error => {
            console.error(error.response.data.message);
        }
    )
}
