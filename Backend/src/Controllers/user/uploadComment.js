import { Comment } from "../../Models/comments.schema.js";
import { Tweet } from "../../Models/tweet.schema.js";
import { Video } from "../../Models/video.schema.js";
import CustomError from "../../utils/Error/CustomErrorClass.js";
import { wrapperAsync } from "../../utils/Error/wrapperAsync.js";

export const uploadComment = wrapperAsync(async (req, res) => {
  const { _id } = req?.user;
  const { type } = req?.query;
  const { typeId } = req?.params;
  const { content } = req?.body;

  if ([_id, type, typeId, content].some((request) => request === undefined)) {
    throw new CustomError(409, "Conflict occured due to missing data");
  }

  if (type === "video") {
    const video = await Video.findById(typeId);
    if (!video) {
      throw new CustomError(404, "video doesn't exist");
    }
    const newComment = await Comment.create({
      content,
      videoId: typeId,
      owner: _id,
    });
    return res.status(201).json({
      status: 201,
      success: true,
      newComment,
      message: "Successfully commented",
    });
  } else if (type === "tweet") {
    const tweet = await Tweet.findById(typeId);
    if (!tweet) {
      throw new CustomError(404, "Tweet doesn't exist");
    }
    const newComment = await Comment.create({
      content,
      tweetId: typeId,
      owner: _id,
    });
    return res.status(201).json({
      status: 201,
      success: true,
      newComment,
      message: "Successfully commented",
    });
  } else {
    throw new CustomError(406, "Not acceptable data");
  }
});
