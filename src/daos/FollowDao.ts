/**
 * @file Implements DAO managing data storage of follows. Uses mongoose FollowModel
 * to integrate with MongoDB
 */
import FollowDaoI from "../interfaces/FollowDaoI";
import FollowModel from "../mongoose/FollowModel";
import Follow from "../models/Follow";
/**
 * @class FollowDao Implements Data Access Object managing data storage
 * of Follows
 * @implements {FollowDaoI} FollowDaoI
 * @property {FollowDao} followDao Private single instance of FollowDao
 */
export default class FollowDao implements FollowDaoI {
    private static followDao: FollowDao | null = null;
    public static getInstance = (): FollowDao => {
        if(FollowDao.followDao === null) {
            FollowDao.followDao = new FollowDao();
        }
        return FollowDao.followDao;
    }
    private constructor() {}
    /**
     * Uses FollowModel to retrieve users that are being followed by a particular user
     * @param {string} uid is the id of the user following
     * @returns Promise To be notified when the users are retrieved from
     * database
     */
    findUserFollowers = async (uid: string): Promise<Follow[]> =>
        FollowModel
            .find({userFollowed: uid})
            .populate("userFollowing")
            .exec();
    /**
     * Uses FollowModel to retrieve user that were following a particular user
     * @param {string} uid is the id of the user being followed
     * @returns Promise To be notified when the users are retrieved from
     * database
     */
    findUserFollowing= async (uid: string): Promise<Follow[]> =>
        FollowModel
            .find({userFollowing: uid})
            .populate("userFollowed")
            .exec();
    /**
     * Inserts follow instance into the database
     * @param {string} uid of user following
     * @param {string} u2id of user being followed
     * @returns Promise To be notified when follow is inserted into the database
     */
    followUser = async (uid: string, u2id: string): Promise<any> =>
        FollowModel.create({userFollowing: uid, userFollowed: u2id});
    /**
     * Removes follow from the database.
     * @param {string} uid of user unfollowing
     * @param {string} u2id of user being unfollowed
     * @returns Promise To be notified when follow is removed from the database
     */
    unfollowUser = async (uid: string, u2id: string): Promise<any> =>
        FollowModel.deleteOne({userFollowing: uid, userFollowed: u2id});
}