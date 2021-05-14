import { giteaInstance } from '../axios';
import { logger } from '../logger';

export const addUserToTeam = async (username, organization, teamName) => {
  const response = (await giteaInstance.get(
    `/orgs/${organization}/teams/search`, {
      params: {
        q: teamName,
      },
    }));
  const queryList = response.data.data;
  if (queryList.length === 0) {
    logger.error(`Team ${teamName} does not exist.`);
    return;
  }
  const id = queryList[0].id;
  await giteaInstance.put(`/teams/${id.toString()}/members/${username}`)
  .then((response) => {
    }, (error) => {
      logger.error(error);
    },
  );
};

export const addUserToTeamBySJTUID = async (
  student, organization, teamName) => {
  const userList = (await (giteaInstance.get(`/users/search`, {
    params: {
      q: student.login_id,
    },
  }))).data.data;
  if (userList.length === 0) {
    return ({
      name: student.name,
      id: student.login_id,
    });
  }
  const username = userList[0].username;
  await addUserToTeam(username, organization, teamName);
  return null;
};
