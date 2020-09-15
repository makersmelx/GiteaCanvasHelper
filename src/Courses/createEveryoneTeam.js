import { createTeam,addUserToTeam } from "../Teams";
import { canvasInstance,giteaInstance } from "../axios";
import { courseID } from "./courses";

export const createEveryoneTeam = async (organization, teamName) => {
    const failList = [];
    const studentList = (await canvasInstance.get(`/courses/${courseID[organization]}/students`)).data;
    const teamID = await createTeam(organization, teamName);
    for (const student of studentList) {
        const studentID = student.login_id;
        const userList = (await (giteaInstance.get(`/users/search`, {
            params: {
                q: studentID,
            }
        }))).data.data;
        if (userList.length === 0) {
            // console.error(`Student ${studentName}is not found on Gitea. I will skip him`);
            failList.push({
                name: student.name,
                id: studentID,
                reason: 'User does not exist on Gitea'
            });
            continue;
        }
        const username = userList[0].username;
        await addUserToTeam(username, organization, teamName);
    }
    return failList;
}