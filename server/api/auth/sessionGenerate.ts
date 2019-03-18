import { CustomRequestHandler } from "../../db/customRequestHandler";
import * as jwt from "jsonwebtoken";
import { secret, expireTime } from "../general/config";

export const apiSessionGenerate: CustomRequestHandler = (req, res, next) => {
    if(req.users){
        const token = jwt.sign({userId: req.users.id}, secret, {expiresIn: expireTime});
        res.status(200).json({auth: true, token: token});
    }
};