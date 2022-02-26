
import {Express, Request, Response} from "express";
import FollowControllerI from "../interfaces/FollowControllerI";
import FollowDao from "../daos/FollowDao";
/**
 * @class FollowController Implements RESTful Web service API for follows resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>GET /api/users/:uid/following to retrieve a list of users user is following
 *     </li>
 *     <li>GET /api/users/:uid/followers to retrieve a list of users that are following the user
 *     </li>
 *     <li>POST /api/users/:uid/follows/:u2id to record that a user follows another user
 *     </li>
 *     <li>DELETE /api/users/:uid/unfollows/:uid to record that a user unfollows another user
 *     </li>
 * </ul>
 * @property {FollowDao} followDao Singleton DAO implementing follows CRUD operations
 * @property {FollowController} FollowController Singleton controller implementing
 * RESTful Web service API
 */

export default class FollowController implements FollowControllerI {
    private static followDao: FollowDao = FollowDao.getInstance();
    private static followController: FollowController | null = null;
/**
 * Creates singleton controller instance
 * @param {Express} app Express instance to declare the RESTful Web service
 * API
 * @return FollowController
 */
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

    /**
     * Retrieves all users that a user is followed by from the database, aka user followers
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing user
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the followers
     */
    findUserFollowers = (req: Request, res: Response) =>
        FollowController.followDao.findUserFollowers(req.params.uid)
            .then(follows => res.json(follows));

    /**
     * Retrieves all users a user is following from the database
     * @param {Request} req Represents request from client, including the path
     * parameter uid for the user
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the follow objects
     */
    findUserFollowing = (req: Request, res: Response) =>
        FollowController.followDao.findUserFollowing(req.params.uid)
            .then(follows => res.json(follows));
    /**
     * @param {Request} req Represents request from client, including the
     * path parameters uid and u2id representing the user that follows
     * the second user and body containing the JSON object for the new
     * follow to be inserted in the database
     * @param {Response} res Represents response to client
     */

    followUser = (req: Request, res: Response) =>
        FollowController.followDao.followUser(req.params.uid, req.params.u2id)
            .then(follows => res.json(follows));

    /**
     * @param {Request} req Represents request from client, including the
     * path parameters source_uid and target_id representing the source user
     * follows the target user to be removed
     * @param {Response} res Represents response to client, including status
     * on whether deletion was successful
     */
    unfollowUser = (req: Request, res: Response) =>
        FollowController.followDao.unfollowUser(req.params.uid, req.params.u2id)
            .then(status => res.send(status));
};