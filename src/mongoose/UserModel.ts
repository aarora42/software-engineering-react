const mongoose = require('mongoose');
import UserSchema from "./UserSchema";
const UserModel = mongoose.model('UserModel', UserSchema);
export default UserModel;