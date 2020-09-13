import {addUserToTeam, createTeam} from "../Teams";
import {formatTeamName} from "../Teams";
import {canvasInstance, giteaInstance} from "../axios";
import {courseID} from "./courses";

/**
 *
 * @param organization
 * @param groupSet
 * @returns {String[]} a list of student that has not been added to team
 */
export const initTeams = async (organization, groupSet) => {
    const failList = [];
    const courseGroupList = (await canvasInstance.get(`/courses/${courseID[organization]}/groups`)).data;
    const groupList = courseGroupList.filter(group => group.name.search(groupSet) !== -1);
    for (const group of groupList) {
        const groupNum = parseInt(group.name.substr(-2));
        if (isNaN(groupNum)) {
            console.error(`Invalid format for group name ${group.name}. I suppose that the last two should be numbers. I will skip this team. Please init it on Gitea by yourself.`);
            continue;
        }
        const teamName = formatTeamName(groupSet, groupNum);
        const teamID = await createTeam(organization, teamName);
        // if (teamID === -1) {
        //     console.error(`Create team ${teamName} in ${organization} fail.`)
        // }
        const groupID = group.id;
        const memberList = (await canvasInstance.get(`/groups/${groupID}/users`)).data;
        for (const member of memberList) {
            const studentZH_ENName = member.short_name;
            const studentNameRaw = studentZH_ENName.split(/[,， ]/);
            const studentName = studentNameRaw.pop();
            const userList = (await (giteaInstance.get(`/users/search`, {
                params: {
                    q: studentName,
                }
            }))).data.data;
            if (userList.length === 0) {
                // console.error(`Student ${studentName}is not found on Gitea. I will skip him`);
                failList.push({
                    name: studentZH_ENName,
                    reason: 'User does not exist on Gitea'
                });
                continue;
            }
            const username = userList[0].username;
            await addUserToTeam(username, organization, teamName);
        }
    }
    return failList;
}

