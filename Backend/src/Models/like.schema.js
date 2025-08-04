import { Schema, model } from "mongoose";

const likeSchema = new Schema(
  {
    commentId: {
      type: Schema.Types.ObjectId,
      ref: "Comment",
      index: true,
    },
    videoId: {
      type: Schema.Types.ObjectId,
      ref: "Video",
      index: true,
    },
    tweetId: {
      type: Schema.Types.ObjectId,
      ref: "Tweet",
      index: true,
    },
    likedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const Like = model("Like", likeSchema);
