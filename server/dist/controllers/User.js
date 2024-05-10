import UserModel from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";
const createUserHandler = async (req, res) => {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
        return res.status(500).json({
            success: false,
            message: "Please fill all the details before submitting",
        });
    }
    let already_a_user = await UserModel.findOne({ email: email });
    if (already_a_user) {
        return res.status(500).json({
            success: false,
            message: "sorry a user with the same email already exists",
        });
    }
    try {
        const salt = bcrypt.genSaltSync(10);
        const encryptedPassword = await bcrypt.hash(password, salt);
        const newUser = await UserModel.create({
            email,
            password: encryptedPassword,
            role,
        });
        const jwtSecret = process.env.JWT_SECRET;
        const payload = {
            userId: newUser._id,
        };
        if (!jwtSecret)
            return res.status(500).json({
                success: false,
                message: "jwt secret not found",
            });
        let authToken = jwt.sign(payload, jwtSecret);
        const cookieOptions = {
            expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
            httpOnly: true,
            secure: false,
            path: "/",
            samesite: "Lax",
        };
        res.cookie("UserCookie", authToken, cookieOptions);
        const userDataWithoutPassword = await UserModel.findById(newUser._id).select('-password');
        return res.status(200).json({
            success: true,
            message: "Account created successfully",
            token: authToken,
            userData: userDataWithoutPassword,
        });
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};
const verifyUserHandler = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(500).json({
            success: false,
            message: "Please fill all the details before submitting",
        });
    }
    try {
        const already_a_user = await UserModel.findOne({ email: email });
        if (!already_a_user) {
            return res.status(404).json({
                success: false,
                message: "User doesnt exist: Please signup before login",
            });
        }
        const comparePassword = await bcrypt.compare(password, already_a_user.password);
        if (!comparePassword) {
            console.log("Incorrect password");
            return res.status(400).json({
                success: false,
                message: "Incorrect password, please double check before submitting",
            });
        }
        const jwtSecret = process.env.JWT_SECRET;
        const payload = {
            userId: already_a_user._id,
        };
        if (!jwtSecret) {
            return res.status(500).json({
                success: false,
                message: "jwt secret not found",
            });
        }
        let authToken = jwt.sign(payload, jwtSecret);
        const cookieOptions = {
            expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
            httpOnly: false,
            secure: true,
            path: "/",
            samesite: "Lax",
        };
        res.cookie("UserCookie", authToken, cookieOptions);
        const userDataWithoutPassword = await UserModel.findById(already_a_user._id).select('-password');
        return res.status(200).json({
            success: true,
            message: "Successfully Logged in",
            token: authToken,
            userData: userDataWithoutPassword
        });
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};
const logoutHandler = (req, res) => {
    const authToken = req.cookies && req.cookies.UserCookie;
    if (!authToken) {
        return res.status(401).json({
            success: false,
            message: "User successfully logged out",
        });
    }
    try {
        console.log("LogOut Endpoint");
        const cookieOptions = {
            expires: new Date(Date.now() - 1),
            secure: true,
            httpOnly: true,
            path: "/",
            samesite: "none",
        };
        return res.clearCookie("UserCookie", cookieOptions).status(200).json({
            success: true,
            message: "Successfully logged Out",
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};
const loginStatusHandler = (req, res) => {
    console.log("Check Login Status");
    const authToken = req.cookies && req.cookies.UserCookie;
    if (!authToken) {
        return res.status(401).json({
            success: false,
            message: "Please login before continuing",
        });
    }
    try {
        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret)
            return res.status(500).json({
                success: false,
                message: "jwt secret not found",
            });
        jwt.verify(authToken, jwtSecret);
        return res.status(200).json({
            success: true,
            message: "User authentication successful",
        });
    }
    catch (err) {
        return res.status(401).json({
            sucess: false,
            message: err.message,
        });
    }
};
export { createUserHandler, verifyUserHandler, logoutHandler, loginStatusHandler, };
//# sourceMappingURL=User.js.map