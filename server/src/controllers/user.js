import User from "../models/user.js";

/*
========================================
GET USER PROFILE
========================================
*/

export const getProfile = async (
  req,
  res
) => {
  try {
    const user = await User.findById(
      req.user._id
    ).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,

        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,

      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: "Server Error",
    });
  }
};