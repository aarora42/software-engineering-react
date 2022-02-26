import {Request, Response} from "express";

/**
 * @file Declares RESTful API for Message resource
 */
export default interface FollowControllerI {
    findMessagesSent (req: Request, res: Response): void;
    findMessagesReceived (req: Request, res: Response): void;
    userSendsMessage (req: Request, res: Response): void;
    userDeletesMessage (req: Request, res: Response): void;
};