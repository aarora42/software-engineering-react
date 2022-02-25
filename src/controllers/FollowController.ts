
import {Express, Request, Response} from "express";
import FollowControllerI from "../interfaces/FollowControllerI";
import FollowDao from "../daos/FollowDao";


export default class FollowController implements FollowControllerI {
    private static followDao: FollowDao = FollowDao.getInstance();
    private static followController: FollowController | null = null;

    public static getInstance = (app: Express): FollowController => {
        if(FollowController.followController === null) {
            FollowController.followController = new FollowController();
            app.get("/api/users/:uid/followers", FollowController.followController.findUserFollowers);
            app.get("/api/users/:uid/following", FollowController.followController.findUserFollowing);
            app.post("/api/users/:uid/follows/:u2id", FollowController.followController.followUser);
            app.delete("/api/users/:uid/unfollows/:u2id", FollowController.followController.unfollowUser);
        }
        return FollowController.followController;
    }

    private constructor() {}


    findUserFollowers = (req: Request, res: Response) =>
        FollowController.followDao.findUserFollowers(req.params.uid)
            .then(follows => res.json(follows));


    findUserFollowing = (req: Request, res: Response) =>
        FollowController.followDao.findUserFollowing(req.params.uid)
            .then(follows => res.json(follows));


    followUser = (req: Request, res: Response) =>
        FollowController.followDao.followUser(req.params.uid, req.params.u2id)
            .then(follows => res.json(follows));


    unfollowUser = (req: Request, res: Response) =>
        FollowController.followDao.unfollowUser(req.params.uid, req.params.u2id)
            .then(status => res.send(status));
};