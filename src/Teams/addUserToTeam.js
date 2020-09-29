import {giteaInstance} from '../axios';

export const addUserToTeam = async (username, organization, teamName) => {
  const response = (await giteaInstance.get(
      `/orgs/${organization}/teams/search`, {
        params: {
          q: teamName,
        },
      }));
  const queryList = response.data.data;
  if (queryList.length === 0) {
    console.error(`Team ${teamName} does not exist.`);
    return;
  }
  const id = queryList[0].id;
  await giteaInstance.put(`/teams/${id.toString()}/members/${username}`).
      then((response) => {
          }, (error) => {
            console.error(error);
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
    // console.error(`Student ${studentName}is not found on Gitea. I will skip him`);
    return ({
      name: student.name,
      id: student.login_id,
      reason: 'User does not exist on Gitea',
    });
  }
  const username = userList[0].username;
  await addUserToTeam(username, organization, teamName);
  return null;
};
