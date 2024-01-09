import { asyncHandler } from "../utiles/asynco.js";
import { ApiError } from "../utiles/ApiError.js";
import { User } from "../modules/User.modle.js";
import { fileUploading } from "../utiles/Cloudinary.js";
import { ApiResponse } from "../utiles/ApiResponse.js";

const userRegister = asyncHandler(async (req, res) => {
   /*
     res.status(200).json({message: "I am Hassan and I know what I have to do"})
*/
   /* 
    get user datail 
    validation:
        Not empty,
        Not exist already:{email, username},
        Check image & avater,
        Upload on Cloudinary,
        Upload in frontend ,
        Check avater on Cloudinary too,
        Thus make Object,
        Enter it in database,
        Remove password and refresh token 

    */

   const { username, email, fullName, password } = req.body;
   console.log(req.body);

   if (
      [username, email, fullName, password].some(
         (fields) => fields?.trim() == "",
      )
   ) {
      throw new ApiError(400, "All the fields are required");
   }

   const existingUsers = await User.findOne({
      $or: [{ username }, { email }],
   });

   if (existingUsers) {
      const ExistingUserError = existingUsers.username
         ? "The username is already exist"
         : "Email is essential too";
      throw new ApiError(403, ExistingUserError);
   }

   const avatarLocalPath = req.files?.avatar[0]?.path;

   let coverImageLocalPath;
   if (
      req.files &&
      Array.isArray(req.files.coverImage) &&
      req.files.coverImage.length > 0
   ) {
      coverImageLocalPath = req.files?.coverImage[0].path;
   }

   if (!avatarLocalPath) {
      throw new ApiError(403, "Avatar is failed to uploaded");
   }

   const avatar = await fileUploading(avatarLocalPath);
   const coverImage = await fileUploading(coverImageLocalPath);

   if (!avatar) {
      throw new ApiError(
         408,
         "Avatar is unsuccessfully uploaded on cloudinary",
      );
   }

   const user = await User.create({
      fullName,
      username: username.toLowerCase(),
      email,
      avatar: avatar.url,
      coverImage: coverImage?.url || "",
      password,
   });

   const createdUser = await User.findById(user._id).select(
      "-password -email -refreshToken",
   );

   return res
      .status(201)
      .json(new ApiResponse(200, createdUser, "User Successfully added"));
});

export { userRegister };
