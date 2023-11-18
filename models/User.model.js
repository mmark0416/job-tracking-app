import mongoose from "mongoose";
import { USER_ROLES } from "../utils/constants.utils.js";

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  lastName: {
    type: String,
    default: "lastName",
  },
  location: {
    type: String,
    default: "my city",
  },
  role: {
    type: String,
    enum: Object.values(USER_ROLES),
    default: USER_ROLES.USER,
  },
  avatar: String,
  avatarPublicId: String,
});

export default mongoose.model("User", UserSchema);
