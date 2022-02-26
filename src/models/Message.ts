
import User from "./User";
/**
 * @file Declares Message data type representing relationship between
 * users and user, as in user sends a message to another user
 */

/**
 * @typedef Message Represents messaging relationship between a user and a user,
 * as in a user messages another user
 * @property {User} to user being messaged
 * @property {User} from User messaging
 * @property {string} content of the message
 * @property {Date} date message was sent
 */
export default interface Message {
    message: string,
    to: User,
    from: User,
    sentOn: Date
};