import { giteaInstance } from '../axios';
import { projectTeamConfig } from '../settings';
import { logger } from '../logger';

/**\
 * Create a team in an organization
 * @param organization {string} organization name
 * @param teamName {string}
 * @param config {Object}
 * @returns {number} id of the team if success, -1 if fail
 */
// const fetch = require('node-fetch');

export const createTeam = async (organization, teamName, config) => {
  try {
    // let a = giteaInstance.post;
    const response = await giteaInstance.post(`/orgs/${organization}/teams`,
      projectTeamConfig(teamName, config));
    // console.log(response.request);
    // console.log(projectTeamConfig(teamName, config));
  } catch (e) {
    logger.error(e.message);
    logger.error(`Create team ${teamName} in ${organization} fails.`);
  }
};


