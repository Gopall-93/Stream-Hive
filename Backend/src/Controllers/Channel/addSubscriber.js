import { Subscription } from "../../Models/subscription.schema.js";
import { User } from "../../Models/User.schema.js";
import CustomError from "../../utils/Error/CustomErrorClass.js";
import { wrapperAsync } from "../../utils/Error/wrapperAsync.js";

export const addSubscriber = wrapperAsync(async (req, res) => {
  const { subscriberId, ownerId } = req.params;

  const owner = await User.findById(ownerId);
  const subscriber = await User.findById(subscriberId);

  const alreadySubscribed = await Subscription.findOne({
    $and: [{ subscriber: subscriberId, channelOwner: ownerId }],
  });

  if (!(owner || subscriber)) {
    throw new CustomError(404, "Not found");
  }

  if (alreadySubscribed) {
    await Subscription.deleteOne({
      $and: [{ subscriber: subscriberId, channelOwner: ownerId }],
    });
    res
      .status(200)
      .json({ status: 200, success: true, message: "Unsubscribed" });
    return;
  }

  const newSubscriber = await Subscription.create({
    subscriber: subscriberId,
    channelOwner: ownerId,
  });

  res.status(200).json({ status: 200, success: true, message: "subscribed" });
});
