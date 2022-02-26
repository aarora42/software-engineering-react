import Message from "../models/Message";

/**
 * @file Declares API for Likes related data access object methods
 */
export default interface MessageDaoI {
    findMessagesSent (uid: string): Promise<Message[]>;
    findMessagesReceived (uid: string): Promise<Message[]>;
    userSendsMessage (uid: string, u2id: string,  message: Message): Promise<Message>;
    userDeletesMessage (mid: string): Promise<any>;
};