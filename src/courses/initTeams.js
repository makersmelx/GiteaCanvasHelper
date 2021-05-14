import { addUserToTeamBySJTUID, createTeam, formatTeamName } from '../teams';
import { canvasInstance } from '../axios';
import { courseID } from './courses';
import { logger } from '../logger';
import { createTeamRepo } from '../teams/createTeamRepo';

/**
 *
 * @param organization
 * @param groupSet
 * @returns {String[]} a list of student that has not been added to team
 */
export const initTeams = async (organization, groupSet) => {
  const failList = [];
  let courseGroupList = [];
  let pageCount = 1;
  while (1) {
    let onePageGroupList = (await canvasInstance.get(
      `/courses/${courseID[organization]}/groups`, {
        params: {
          page: pageCount,
        },
      })).data;
    if (onePageGroupList.length === 0) {
      break;
    }
    courseGroupList = [...courseGroupList, ...onePageGroupList];
    pageCount = pageCount + 1;
  }

  const groupList = courseGroupList.filter(
    group => {
      let splitName = group.name.split(' ');
      return splitName[0] === groupSet;
    });
  for (const group of groupList) {
    // get a formatted team name from canvas group
    const groupNum = parseInt(group.name.substr(-2));
    if (isNaN(groupNum)) {
      logger.error(
        `Invalid format for group name ${group.name}. I suppose that the last two should be numbers. I will skip this team. Please init it on Gitea by yourself.`);
      continue;
    }

    // create team
    const teamName = formatTeamName(groupSet, groupNum);
    await createTeam(organization, teamName, {});
    await createTeamRepo(organization, teamName);

    // add team member
    const groupID = group.id;
    const memberList = (await canvasInstance.get(
      `/groups/${groupID}/users`)).data;
    for (const student of memberList) {
      const failInfo = await addUserToTeamBySJTUID(student, organization,
        teamName);
      if (failInfo) {
        failList.push(failInfo);
      }
    }
  }
  return failList;
};

