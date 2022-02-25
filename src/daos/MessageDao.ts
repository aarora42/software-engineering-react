import MessageDaoI from "../interfaces/MessageDaoI";
import Message from "../models/Message";
import MessageModel from "../mongoose/MessageModel";

export default class MessageDao implements MessageDaoI {
    private static messageDao: MessageDao | null = null;
    public static getInstance = (): MessageDao => {
        if(MessageDao.messageDao === null) {
            MessageDao.messageDao = new MessageDao();
        }
        return MessageDao.messageDao;
    }
    private constructor() {}
    findMessagesSent = async (uid: string): Promise<Message[]> =>
        MessageModel
            .find({from: uid})
            .populate("to")
            .exec();
    findMessagesReceived = async (uid: string): Promise<Message[]> =>
        MessageModel
            .find({to: uid})
            .populate("from")
            .exec();
    userSendsMessage = async (uid: string, u2id: string): Promise<any> =>
        MessageModel.create({from: uid, to: u2id});
    userDeletesMessage = async (uid: string, u2id: string): Promise<any> =>
        MessageModel.deleteOne({from: uid, to: u2id});
}