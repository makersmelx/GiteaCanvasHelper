import {createTeam, addUserToTeamBySJTUID} from '../teams';
import {canvasInstance} from '../axios';
import {courseID} from './courses';

export const createEveryoneTeam = async (organization, teamName) => {
  const failList = [];
  const studentList = (await canvasInstance.get(
      `/courses/${courseID[organization]}/students`)).data;
  await createTeam(organization, teamName, {permission: 'read'});
  for (const student of studentList) {
    const failInfo = await addUserToTeamBySJTUID(student, organization,
        teamName);
    if (failInfo) {
      failList.push(failInfo);
    }
  }
  return failList;
};
