import User from "./User";
/**
 * @file Declares Tuit data type representing a tuit
 */

/**
 * @typedef Tuit Represents a tuit being created by a user
 * @property {string} tuit content of the tuit
 * @property {User} user who posted the tuit
 * @property {Date} date message was sent
 */
export default interface Tuit {
    tuit: string,
    postedBy: User,
    postedOn?: Date,
};