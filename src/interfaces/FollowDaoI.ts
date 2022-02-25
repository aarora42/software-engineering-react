import Follow from "../models/Follow";

/**
 * @file Declares API for Follows related data access object methods
 */
export default interface FollowDaoI {
    findUserFollowing (uid: string): Promise<Follow[]>;
    findUserFollowers (uid: string): Promise<Follow[]>;
    followUser (uid: string, u2id: string): Promise<Follow>;
    unfollowUser (uid: string, u2id: string): Promise<any>;
};