
import {Express, Request, Response} from "express";
import MessageControllerI from "../interfaces/MessageControllerI";
import MessageDao from "../daos/MessageDao";

/**
 * @class MessageController Implements RESTful Web service API for messages resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>GET /api/users/:uid/messages to retrieve all messages sent by a user
 *     </li>
 *     <li>GET /api/users/:uid/messages/received to retrieve all messages received by a user
 *     </li>
 *     <li>POST /api/users/:uid/messages/:u2id to record that a user sent a message
 *     </li>
 *     <li>DELETE /api/messages/:mid to remove a particular message instance
 *     </li>
 * </ul>
 * @property {MessageDao} messageDao Singleton DAO implementing messages CRUD operations
 * @property {MessageController} MessageController Singleton controller implementing
 * RESTful Web service API
 */
export default class MessageController implements MessageControllerI {
    private static messageDao: MessageDao = MessageDao.getInstance();
    private static messageController: MessageController | null = null;
    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @return MessageController
     */
    public static getInstance = (app: Express): MessageController => {
        if(MessageController.messageController === null) {
            MessageController.messageController = new MessageController();
            app.get("/api/users/:uid/messages/received", MessageController.messageController.findMessagesReceived);
            app.get("/api/users/:uid/messages/sent", MessageController.messageController.findMessagesSent);
            app.post("/api/users/:uid/messages/:u2id", MessageController.messageController.userSendsMessage);
            app.delete("/api/messages/:mid", MessageController.messageController.userDeletesMessage);
        }
        return MessageController.messageController;
    }

    private constructor() {}

    /**
     * Retrieves all messages sent by a user
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing user sent the messages
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the message objects
     */
    findMessagesSent = (req: Request, res: Response) =>
        MessageController.messageDao.findMessagesSent(req.params.uid)
            .then(messages => res.json(messages));

    /**
     * Retrieves all messages receieved by a user
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing user sent the messages
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the messages user received
     */
    findMessagesReceived = (req: Request, res: Response) =>
        MessageController.messageDao.findMessagesReceived(req.params.uid)
            .then(messages => res.json(messages));

    /**
     * @param {Request} req Represents request from client, including the
     * path parameters uid and u2id representing the first user sending
     * the message to the second user and body containing the JSON object for the new
     * message to be inserted in the database
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new message that was inserted in the
     * database
     */
    userSendsMessage = (req: Request, res: Response) =>
        MessageController.messageDao.userSendsMessage(req.params.uid, req.params.u2id, req.body)
            .then(messages => res.json(messages));

    /**
     * @param {Request} req Represents request from client, including the
     * path parameters mid representing the id of message to be removed
     * @param {Response} res Represents response to client, including status
     * on whether deleting the message was successful or not
     */
    userDeletesMessage = (req: Request, res: Response) =>
        MessageController.messageDao.userDeletesMessage(req.params.mid)
            .then(status => res.send(status));
};