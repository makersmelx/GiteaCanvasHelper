import {createTeam} from "../Teams";
import {formatTeamName} from "../Teams";

export const initTeams = async (organization, teamNum) => {
    for (let i = 1; i <= teamNum; i++) {
        await createTeam(organization, formatTeamName(i));
    }
}
