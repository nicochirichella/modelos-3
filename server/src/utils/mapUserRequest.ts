import { User } from '../../../commons/types/user';
import v4 = require("uuid/v4");

export const mapUserRequest = (user: any, token: string): User => {
    const { id, firstName, lastName, pictureUrl, email, otherContactInfo } = user;

    const fullName = `${firstName} ${lastName}`;

    return <User>{
        id,
        name: fullName,
        avatar: pictureUrl,
        username: formatUsername(firstName, lastName),
        email,
        profileUrl: `https://www.linkedin.com/search/results/all/?keywords=${encodeURIComponent(fullName)}&origin=GLOBAL_SEARCH_HEADER`,
        otherContactInfo: otherContactInfo,
        linkedinToken: token,
        snakeToken: v4()
    };
};

export const formatUsername = (firstName: string, lastName: string): string => {
    return `${hackerize(firstName)} ${hackerize(lastName)}`;
};

export const hackerize = (str: string): string => {
    return str.toLowerCase()
        .replace(/e/ig, '3')
        .replace(/a/ig, '4')
        .replace(/l/ig, '1')
        .replace(/c/ig, 'k')
        .replace(/s/ig, 'z')
        .replace(/o/ig, '0');
};
