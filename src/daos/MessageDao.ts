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
    userSendsMessage = async (uid: string, u2id: string, message: Message): Promise<Message> =>
        MessageModel.create({...message, to: u2id, from: uid});
    userDeletesMessage = async (mid: string): Promise<any> =>
        MessageModel.deleteOne({_id:mid});
}