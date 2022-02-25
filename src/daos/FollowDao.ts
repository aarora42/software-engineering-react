import FollowDaoI from "../interfaces/FollowDaoI";
import FollowModel from "../mongoose/FollowModel";
import Follow from "../models/Follow";
export default class FollowDao implements FollowDaoI {
    private static followDao: FollowDao | null = null;
    public static getInstance = (): FollowDao => {
        if(FollowDao.followDao === null) {
            FollowDao.followDao = new FollowDao();
        }
        return FollowDao.followDao;
    }
    private constructor() {}
    findUserFollowers = async (uid: string): Promise<Follow[]> =>
        FollowModel
            .find({userFollowed: uid})
            .populate("userFollowing")
            .exec();
    findUserFollowing= async (uid: string): Promise<Follow[]> =>
        FollowModel
            .find({userFollowing: uid})
            .populate("userFollowed")
            .exec();
    followUser = async (uid: string, u2id: string): Promise<any> =>
        FollowModel.create({userFollowing: uid, userFollowed: u2id});
    unfollowUser = async (uid: string, u2id: string): Promise<any> =>
        FollowModel.deleteOne({userFollowing: uid, userFollowed: u2id});
}