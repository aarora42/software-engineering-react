
import {Express, Request, Response} from "express";
import MessageControllerI from "../interfaces/MessageControllerI";
import MessageDao from "../daos/MessageDao";

export default class MessageController implements MessageControllerI {
    private static messageDao: MessageDao = MessageDao.getInstance();
    private static messageController: MessageController | null = null;

    public static getInstance = (app: Express): MessageController => {
        if(MessageController.messageController === null) {
            MessageController.messageController = new MessageController();
            app.get("/api/users/:uid/messages/received", MessageController.messageController.findMessagesReceived);
            app.get("/api/users/:uid/messages/sent", MessageController.messageController.findMessagesSent);
            app.post("/api/users/:uid/messages/:u2id", MessageController.messageController.userSendsMessage);
            app.delete("/api/users/:uid/unmessages/:u2id", MessageController.messageController.userDeletesMessage);
        }
        return MessageController.messageController;
    }

    private constructor() {}


    findMessagesSent = (req: Request, res: Response) =>
        MessageController.messageDao.findMessagesSent(req.params.uid)
            .then(messages => res.json(messages));


    findMessagesReceived = (req: Request, res: Response) =>
        MessageController.messageDao.findMessagesReceived(req.params.uid)
            .then(messages => res.json(messages));


    userSendsMessage = (req: Request, res: Response) =>
        MessageController.messageDao.userSendsMessage(req.params.uid, req.params.u2id)
            .then(messages => res.json(messages));


    userDeletesMessage = (req: Request, res: Response) =>
        MessageController.messageDao.userDeletesMessage(req.params.uid, req.params.u2id)
            .then(status => res.send(status));
};