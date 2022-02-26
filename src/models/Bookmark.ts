
import Tuit from "./Tuit";
import User from "./User";

/**
 * @file Declares Bookmark data type representing relationship between Tuits and users
 */


/**
 * @typedef Bookmark Represents bookmarks relationship between a user and a tuit,
 * as in a user bookmarks a tuit
 * @property {Tuit} bookmark Tuit being bookmarked
 * @property {User} bookmarkedBy User bookmarking the tuit
 */

export default interface Bookmark {
    bookmark: Tuit,
    bookmarkedBy: User
};