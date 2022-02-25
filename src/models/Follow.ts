/**
 * @file Declares Follow data type representing relationship between
 * two users, as in user follows another user
 */
import User from "./User";

/**
 * @typedef Follow Represents follows relationship between a user and a user,
 * as in a user follows a user
 */

export default interface Follow {
    userFollowed: User,
    userFollowing: User
};