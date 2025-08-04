import { User } from "../../Models/User.schema.js";
import CustomError from "../../utils/Error/CustomErrorClass.js";
import { wrapperAsync } from "../../utils/Error/wrapperAsync.js";

export const getChennelInfo = wrapperAsync(async (req, res) => {
  const username = req.params.username;

  if (!username) {
    throw new CustomError(400, "Username is required");
  }

  const channelInfo = await User.aggregate([
    {
      $match: {
        username,
      },
    },
    {
      $lookup: {
        from: "videos",
        localField: "_id",
        foreignField: "owner",
        as: "videos",
        pipeline:[{
          $project:{
            title:1,
            views:1,
            thumbnail:1,
            createdAt:1
          }
        }]
      },
      
    },
    {
      $lookup: {
        from: "subscriptions",
        localField: "_id",
        foreignField: "channelOwner",
        as: "subscribers",
      },
    },
    {
      $lookup: {
        from: "subscriptions",
        localField: "_id",
        foreignField: "subscriber",
        as: "subscribedTo",
      },
    },
    {
      $addFields: {
        subscriberCount: {
          $size: "$subscribers",
        },
        videosCount: {
          $size: "$videos",
        },
        subscribedToCount: {
          $size: "$subscribedTo",
        },
        isSubscribed: {
          $cond: {
            if: { $in: [req.user?._id, "$subscribers.subscriber"] },
            then: true,
            else: false,
          },
        },
      },
    },
    {
      $project: {
        username: 1,
        avatar: 1,
        coverImage: 1,
        subscriberCount: 1,
        subscribedToCount: 1,
        videos: 1,
        videosCount: 1,
        isSubscribed: 1,
      },
    },
  ]);

  if (!channelInfo?.length) {
    throw new CustomError(404, "Channel not found");
  }

  res.status(200).json({
    success: true,
    status: 200,
    channel: channelInfo[0],
    message: "Channel Found",
  });
});
