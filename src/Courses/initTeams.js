import {addUserToTeamBySJTUID, createTeam} from "../Teams";
import {formatTeamName} from "../Teams";
import {canvasInstance} from "../axios";
import {courseID} from "./courses";

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
        let onePageGroupList = (await canvasInstance.get(`/courses/${courseID[organization]}/groups`, {
            params: {
                page:pageCount
            }
        })).data;
        if (onePageGroupList.length === 0) {
            break;
        }
        courseGroupList = [...courseGroupList, ...onePageGroupList];
        pageCount = pageCount + 1;
    }
    
    const groupList = courseGroupList.filter(group => group.name.search(groupSet) !== -1);
    for (const group of groupList) {
        const groupNum = parseInt(group.name.substr(-2));
        if (isNaN(groupNum)) {
            console.error(`Invalid format for group name ${group.name}. I suppose that the last two should be numbers. I will skip this team. Please init it on Gitea by yourself.`);
            continue;
        }
        const teamName = formatTeamName(groupSet, groupNum);
        const teamID = await createTeam(organization, teamName, {});
        // if (teamID === -1) {
        //     console.error(`Create team ${teamName} in ${organization} fail.`)
        // }
        const groupID = group.id;
        const memberList = (await canvasInstance.get(`/groups/${groupID}/users`)).data;
        for (const student of memberList) {
            const failInfo = await addUserToTeamBySJTUID(student, organization, teamName);
            if (failInfo) {
                failList.push(failInfo);
            }
        }
    }
    return failList;
}

