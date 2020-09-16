import { giteaInstance } from "../axios";

/**\
 * Create a team in an organization
 * @param organization {string} organization name
 * @param team {string} name of the team that you would like to create
 * @returns {number} id of the team if success, -1 if fail
 */
export const createTeam = async (organization, teamName, config) => {
    const teamID = await giteaInstance.post(`/orgs/${organization}/teams`, {
        "description": config.description || 'empty',
        "includes_all_repositories": config.includes_all_repositories || false,
        "name": teamName,
        "permission": config.permission || "write",
        "units": config.units || [
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
    })
    // if (teamID === -1) {
    //     return teamID;
    // }
    
    const ret = await createTeamRepo(organization, teamName);
}

const createTeamRepo = async (organization, teamName) => {
    const repoName = teamName;
    const repoOption = {
        auto_init: true,
        default_branch:'master',
        description: `Repository for ${teamName}`,
        gitignores: '',
        issue_labels:'',
        license: '',
        name: repoName,
        private: true,
        readme: `${teamName}`
    }

    //create repo
    const ret = await giteaInstance.post(`/orgs/${organization}/repos`, {
        "auto_init": true,
        "description": "string",
        "name": `${teamName}`,
        "private": true,
      })
        .then(response => {
            switch (response.status) {
                case 409:
                    console.log(`${organization}/${repoName} already exists.`);
                    return Promise.resolve(-1);
                case 422:
                    console.error(`Creating ${organization}/${repoName} fails.`);
                    return Promise.resolve(-1);
                case 201:
                    return Promise.resolve(1);
                default:
                    return Promise.resolve(-1);
            }   
        }, error => {
                return Promise.resolve(-1);
        })

    if (ret === -1) {
        return;
    }

    //grant access to team
    let response = (await giteaInstance.get(`/orgs/${organization}/teams/search`, {
        params: {
            q: teamName
        }
    }))
    const queryList = response.data.data;
    if (queryList.length === 0) {
        console.error(`Team ${teamName} does not exist.`)
        return;
    }
    const teamID = queryList[0].id;

    response = await giteaInstance.put(`/teams/${teamID}/repos/${organization}/${repoName}`)
        .then(response => {
            switch (response.status) {
                case 403:
                    console.error(`Grant access of ${teamName} to repo ${repoName} fails.`)
                    break;
                default:
                    break
            }
        }, error => {
                console.error(error.response);
        })
}   
