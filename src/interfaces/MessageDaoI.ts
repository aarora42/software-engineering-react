import Message from "../models/Message";

export default interface MessageDaoI {
    findMessagesSent (uid: string): Promise<Message[]>;
    findMessagesReceived (uid: string): Promise<Message[]>;
    userSendsMessage (uid: string, u2id: string): Promise<Message>;
    userDeletesMessage (uid: string, u2id: string): Promise<any>;
};