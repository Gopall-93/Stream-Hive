import express from "express";
import { zodValidator } from "../Middleware/zodValidator.middleware.js";
import { userValidatorSchema } from "../Validators/userValidator.js";
import { userRegistration } from "../Controllers/auth/userRegistration.controller.js";
import { upload } from "../Middleware/multer.middleware.js";
import { loginValidator } from "../Validators/loginValidator.js";
import { userLogin } from "../Controllers/auth/userLogin.controller.js";
import { verifyToken } from "../Middleware/auth/auth.middleware.js";
import { userLogout } from "../Controllers/auth/userLogout.controller.js";
import { refreshToken } from "../Controllers/auth/refreshToken.controller.js";
import CustomError from "../utils/Error/CustomErrorClass.js";
import { updateUserProfile } from "../Controllers/auth/updateUserProfile.controller.js";
import { updateUserPassword } from "../Controllers/auth/updateUserPassword.js";
import { uploadVideo } from "../Controllers/Channel/uploadVideo.js";
import { getChennelInfo } from "../Controllers/Channel/getChannelInfo.js";
import { uploadComment } from "../Controllers/user/uploadComment.js";
import { getVideoFile } from "../Controllers/Channel/getVideoFile.js";
import { addSubscriber } from "../Controllers/Channel/addSubscriber.js";
import { updateLikes } from "../Controllers/Channel/updateLikes.js";

export const router = express.Router();

//testing route
router.get("/ping", (req, res) => {
  res.json({ message: "Listening pong" });
});

//subscriber addups
router.get("/subscribe/:subscriberId/:ownerId", addSubscriber);

//channel Info route
router.get("/channel-info/:username", getChennelInfo);

router.get("/watch/:id/:viewerId", getVideoFile);

//update user details
router.patch("/update/profile", verifyToken, updateUserProfile);

//update user Password
router.patch("/update/password", verifyToken, updateUserPassword);

//likes route
router.post("/like/:typeId",verifyToken,updateLikes)

//route for saving the comments to dataBase
router.post("/comments/:typeId", verifyToken, uploadComment);

//getting user details
router.post("/getuser", verifyToken, async (req, res) => {
  const user = req.user;

  if (!user) {
    throw new CustomError(401, "Unauthorized");
  }

  res.status(200).json({
    status: 200,
    success: true,
    userDetails: user,
    message: "Here's the user details",
  });
});

//User resgitration route
router.post(
  "/registration",
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "coverImage", maxCount: 1 },
  ]),
  zodValidator(userValidatorSchema),
  userRegistration
);

//upload video
router.post(
  "/uploadvideo",
  verifyToken,
  upload.fields([
    { name: "video", maxCount: 1 },
    { name: "thumbnail", maxCount: 1 },
  ]),
  uploadVideo
);

//User login route
router.post("/login", zodValidator(loginValidator), userLogin);

//User Logout route
router.post("/logout", verifyToken, userLogout);

//If the acess token expires the Frontend can refresh here
router.post("/refreshtoken", refreshToken);
