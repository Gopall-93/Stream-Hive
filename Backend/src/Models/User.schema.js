import mongoose from "mongoose";
import { nanoid } from "nanoid";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      unique: true,
      trim: true,
      index: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    phonenumber: {
      type: String,
      unique: true,
      index: true,
      required: true,
    },
    avatar: {
      type: String,
      default: () =>
        `https://api.dicebear.com/9.x/lorelei-neutral/svg?seed=${nanoid(10)}`,
    },
    coverImage: {
      type: String,
      default: () =>
        `https://api.dicebear.com/9.x/glass/svg?seed=${nanoid(10)}`,
    },
    emailId: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    },
    refreshToken: {
      type: String,
    },
    watchHistory: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.validatePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};
userSchema.methods.generateAccessToken = async function () {
  return JWT.sign(
    { id: this._id, username: this.username },
    process.env.ACCESS_TOKEN_SECRET_KEY,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
  );
};
userSchema.methods.generateRefreshToken = async function () {
  return JWT.sign({ id: this._id }, process.env.REFRESH_TOKEN_SECRET_KEY, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
  });
};
userSchema.set("toJSON", {
  transform(doc, ret) {
    delete ret.password;
    delete ret.refreshToken;
    return ret;
  },
});
export const User = mongoose.model("User", userSchema);
