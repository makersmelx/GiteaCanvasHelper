import {createTeam,addUserToTeamBySJTUID} from "../Teams";
import {canvasInstance} from "../axios";
import {courseID} from "./courses";

export const createEveryoneTeam = async (organization, teamName) => {
    const failList = [];
    const studentList = (await canvasInstance.get(`/courses/${courseID[organization]}/students`)).data;
    const teamID = await createTeam(organization, teamName, {permission:'read'});
    for (const student of studentList) {
        const failInfo = await addUserToTeamBySJTUID(student, organization, teamName);
        if (failInfo) {
            failList.push(failInfo);
        }
    }
    return failList;
}

export const createEveryoneTeamLoop = async (organization, teamName, delay) => {
    const studentList = (await canvasInstance.get(`/courses/${courseID[organization]}/students`)).data;
    const teamID = await createTeam(organization, teamName, { permission: 'write' });
    const addedList = new Set([])
    const addStudent = async () => {
        for (const student of studentList) {
            const failInfo = await addUserToTeamBySJTUID(student, organization, teamName);
            if (!failInfo) {
                if (!addedList.has(student.name)) {
                    console.log(`Successfully add ${student.name}`);
                    addedList.add(student.name)
                }
            }
        }
        console.log('Sleep. Ai, good Night.')
        console.log('\n============================\n');
        setTimeout(addStudent, delay);
    }
    addStudent();
}