import { Router } from "express";
// import jwt from "jsonwebtoken";
// import { DecodeToken, checkToken } from "../middlewares/checkToken";
// import { UserModel } from "../models/UserModel";
export const userRouter = Router();

userRouter.get("/me", /*checkToken,*/ async (req, res) => {
    // const decoded = jwt.decode(req.token!) as DecodeToken
    // const user = await UserModel.findOne({ where: { id: decoded.id } });
    /*
    if (user) {
        delete user.dataValues.password;
        res.json(user);
    }
    else {
        res.status(404).send("User not found");
    }
    */
});