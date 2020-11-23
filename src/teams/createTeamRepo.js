import {giteaInstance} from '../axios';
import {teamRepoMasterProtection} from '../settings';
import {logger} from '../logger';

/**
 *
 * @param organization
 * @param teamName
 * @returns {Promise<void>}
 */
export const createTeamRepo = async (organization, teamName) => {
  const repoName = teamName;

  //create repo
  const ret = await giteaInstance.post(`/orgs/${organization}/repos`, {
    'auto_init': true,
    'description': 'string',
    'name': `${teamName}`,
    'private': true,
  }).then(response => {
    switch (response.status) {
      case 409:
        logger.info(`${organization}/${repoName} already exists.`);
        return Promise.resolve(-1);
      case 422:
        logger.error(`Creating ${organization}/${repoName} fails.`);
        return Promise.resolve(-1);
      case 201:
        return Promise.resolve(1);
      default:
        return Promise.resolve(-1);
    }
  }, error => {
    return Promise.resolve(-1);
  });

  // if (ret === -1) {
  //   return;
  // }

  //grant access to team
  let response = (await giteaInstance.get(`/orgs/${organization}/teams/search`,
      {
        params: {
          q: teamName,
        },
      }));
  const queryList = response.data.data;
  if (queryList.length === 0) {
    logger.error(`Team ${teamName} does not exist.`);
    return;
  }
  const teamID = queryList[0].id;

  await giteaInstance.put(
      `/teams/${teamID}/repos/${organization}/${repoName}`).then(response => {
    switch (response.status) {
      case 403:
        logger.error(`Grant access of ${teamName} to repo ${repoName} fails.`);
        break;
      default:
        break;
    }
  }, error => {
    logger.error(error.response);
  });

  // add branch protection
  await giteaInstance.post(
      `/repos/${organization}/${repoName}/branch_protections`,
      teamRepoMasterProtection(),
  ).then((response) => {
    logger.info(response.status);
  }, (error) => {
    logger.error(error.response.data);
  });
  await giteaInstance.patch(
      `/repos/${organization}/${repoName}/branch_protections/master`,
      teamRepoMasterProtection(),
  ).then((response) => {
    logger.info(response.status);
  }, (error) => {
    logger.error(error.response.data);
  });
};
