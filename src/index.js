import {courses, initTeams} from "./Courses";
import {addUserToTeam, createTeam, formatTeamName} from "./Teams";
import {giteaInstance} from "./axios";

const readlineSync = require('readline-sync');

const callInitTeams = async (organization, groupSetName) => {
    const failList = await initTeams(courses[organization.toLowerCase()], groupSetName);
    console.warn("Warning: If a student are not added into a group in this group set on Canvas, for coding convenience, I will nothing about this student here. Please check him manually.\n")
    console.log("Notice that the below students are not adding to a expected Gitea Team.\n")
    console.log(failList);
}
console.log(process.env.DEBUG);
const organization = process.argv[2] || readlineSync.question('Type in the course/organization name:\n');
const groupSetname = process.argv[3] || readlineSync.question('Type in the group set name, like pgroup (if one group is named as pgroup-01):\n')
callInitTeams(organization, groupSetname);

