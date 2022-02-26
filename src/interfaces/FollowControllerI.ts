/**
 * @file Declares controller RESTful API for Follows resource
 */
import {Request, Response} from "express";

export default interface FollowControllerI {
    findUserFollowing (req: Request, res: Response): void;
    findUserFollowers (req: Request, res: Response): void;
    followUser (req: Request, res: Response): void;
    unfollowUser (req: Request, res: Response): void;
};