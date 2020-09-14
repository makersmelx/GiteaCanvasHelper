import {courses, initTeams} from "./Courses";
import { createStudentTeam } from "./Courses/createStudentTeam";

const readlineSync = require('readline-sync');

const callInitTeams = async (organization, groupSetName) => {
    const failList = await initTeams(courses[organization.toLowerCase()], groupSetName);
    console.warn("Warning: If a student are not added into a group in this group set on Canvas, for coding convenience, I will nothing about this student here. Please check him manually.\n")
    console.log("Notice that the below students are not adding to a expected Gitea Team.\n")
    console.log(failList);
}

const callCreateStudentTeam = async (organization) => {
    const failList = await createStudentTeam(courses[organization.toLowerCase()]);
    console.log("Notice that the below students are not adding to the expected Gitea Student Team.\n")
    console.log(failList);
}
const argv = process.argv.slice(3);
let organization, groupSetName;
switch (process.argv[2]) {
    case 's':
        organization = argv[0] || readlineSync.question('Type in the course/organization name:\n');
        callCreateStudentTeam(organization);
        break;
    case 'i':
        organization = argv[0] || readlineSync.question('Type in the course/organization name:\n');
        groupSetName = argv[1] || readlineSync.question('Type in the group set name, like pgroup (if one group is named as pgroup-01):\n')
        callInitTeams(organization, groupSetName);
        break;
    case 'h':
    default:
        console.log('Unrecognized arguments. For usage guidance, see README.md')
        break;
}


