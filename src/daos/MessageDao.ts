/**
 * @file Implements DAO managing data storage of messages. Uses mongoose MessageModel
 * to integrate with MongoDB
 */
import MessageDaoI from "../interfaces/MessageDaoI";
import Message from "../models/Message";
import MessageModel from "../mongoose/MessageModel";
/**
 * @class MessageDao Implements Data Access Object managing data storage
 * of Messages
 * @implements {MessageDaoI} MessageDaoI
 * @property {MessageDao} messageDao Private single instance of MessageDao
 */
export default class MessageDao implements MessageDaoI {
    private static messageDao: MessageDao | null = null;
    public static getInstance = (): MessageDao => {
        if(MessageDao.messageDao === null) {
            MessageDao.messageDao = new MessageDao();
        }
        return MessageDao.messageDao;
    }
    private constructor() {}
    /**
     * Uses MessageModel to retrieve messages sent by user
     * @returns Promise To be notified when the users are retrieved from
     * database
     */
    findMessagesSent = async (uid: string): Promise<Message[]> =>
        MessageModel
            .find({from: uid})
            .populate("to")
            .exec();
    /**
     * Uses MessageModel to retrieve messages receieved by user
     * @returns Promise To be notified when the users are retrieved from
     * database
     */
    findMessagesReceived = async (uid: string): Promise<Message[]> =>
        MessageModel
            .find({to: uid})
            .populate("from")
            .exec();
    /**
     * Inserts messsage instance into the database
     * @param {string} uid of user sending message
     * @param {string} u2id of user receiving message
     * @param {Message} message instance to be inserted into the database
     * @returns Promise To be notified when tuit is inserted into the database
     */
    userSendsMessage = async (uid: string, u2id: string, message: Message): Promise<Message> =>
        MessageModel.create({...message, to: u2id, from: uid});
    /**
     * Removes message from the database.
     * @param {string} mid Primary key of message to be removed
     * @returns Promise To be notified when message is removed from the database
     */
    userDeletesMessage = async (mid: string): Promise<any> =>
        MessageModel.deleteOne({_id:mid});
}