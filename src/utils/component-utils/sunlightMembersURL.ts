import { UserGroups } from "interfaces/userFromSunlight" 
import { dataUrls } from "../../../config/url"
export const sunlightMembersURL = (groupsData: UserGroups[]): string => {
    const sunlightURL = dataUrls.URLs.sunlight
    const groupId = groupsData && groupsData[0].group_id
    const finalURL = `${sunlightURL}/groups/${groupId}/members` 
    return finalURL
}