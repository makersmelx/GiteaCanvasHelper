import {
  initTeams,
  createEveryoneTeam,
  courseID,
} from './courses';
import {logger} from './logger';

const readlineSync = require('readline-sync');

const callInitTeams = async (organization, groupSetName) => {
  const failList = await initTeams(courseID[organization.toLowerCase()],
      groupSetName);
  logger.warn(
      'If a student are not added into a group in this group set on Canvas, for coding convenience, I will do nothing about this student here. Please check him manually.\n');
  logger.info(
      'Notice that the below students are not adding to a expected Gitea Team.\n');
  logger.info(failList);
};

const callCreateStudentTeam = async (organization, teamName) => {
  const failList = await createEveryoneTeam(courseID[organization.toLowerCase()],
      teamName);
  logger.info(
      'Notice that the below students are not adding to the expected Gitea Student Team.\n');
  logger.info(failList);
};
const argv = process.argv.slice(3);
let organization, groupSetName, teamName, delay, mode;
mode = process.argv[2] || readlineSync.question(
    'Please choose a mode.\n  [s] Create a team that includes all students of this course.\n  [i] Create teams according the group set name on canvas.\n> ');
switch (mode) {
  case 's':
    organization = argv[0] ||
        readlineSync.question('Type in the course/organization name:\n');
    teamName = argv[1] || readlineSync.question(
        'Type in the overall team name, like Students:\n');
    callCreateStudentTeam(organization, teamName);
    break;
  case 'i':
    organization = argv[0] ||
        readlineSync.question('Type in the course/organization name:\n');
    groupSetName = argv[1] || readlineSync.question(
        'Type in the group set name, like pgroup (if one group is named as pgroup-01):\n');
    callInitTeams(organization, groupSetName);
    break;
  case 'h':
  default:
    console.log('Unrecognized arguments. For usage guidance, see README.md');
    break;
}


