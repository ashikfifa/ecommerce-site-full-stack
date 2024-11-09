import sendEmail from "../config/sendEmail.js";
import UserModel from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import verifyEmailTemplate from "../utils/verifyEmailTemplate.js";

export async function registerUserController(req, res) {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Provide email,name,password",
        error: true,
        success: false,
      });
    }

    const user = await UserModel.findOne({ email });

    if (user) {
      return res.json({
        message: "Already regiter email ",
        error: true,
        success: false,
      });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(password, salt);

    const payload = {
      name,
      email,
      password: hashPassword,
    };

    const newUser = new UserModel(payload);
    const save = await newUser.save();

    const verifyUrl = `${process.env.FRONTEND_URL}/verify-email?code=${save._id} `;

    const verifyEmail = await sendEmail({
      sendTo: email,
      subject: "Verify email from sopno",
      html: verifyEmailTemplate({
        name,
        url: verifyUrl,
      }),
    });

    return res.json({
      message: "User register successfully",
      error: false,
      success: true,
      data: save,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function verifyEmailController(req, res) {
  const { code } = req.body;

  const user = await UserModel.findOne({ _id: code });

  if (!user) {
    return res.status(400).json({
      message: "Invalid code",
      error: true,
      success: false,
    });
  }

  const updateUser = await UserModel.updateOne(
    { _id: code },
    {
      verify_email: true,
    }
  );
}

export async function loginController(req,res) {
  
}
