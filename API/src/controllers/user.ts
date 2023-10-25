import { Request, Response } from "express";
import mongoose, { Model } from "mongoose";
import bcrypt from "bcrypt";

import MODELS from "../enums/models";
import Helpers from "../helpers";
import STATUS_CODES from "../enums/statusCode";
import repository from "../repositories";
import { IUser } from "../models/user";

const Users: Model<IUser> = mongoose.model<IUser>(MODELS.USERS);

const getAll = (req: Request, res: Response) => {
    let offset: number | undefined = parseInt(process.env.OFFSET!);
    let count: number | undefined = parseInt(process.env.COUNT!);
    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset as string, 10);
    }
    if (req.query && req.query.count) {
        count = parseInt(req.query.count as string, 10);
    }
    repository.getAll(Users, offset, count, res);
}

const getOne = (req: Request, res: Response) => {
    const { username } = req.params;
    repository.getOneBy(Users, { username }, res)
}

const addOne = (req: Request, res: Response) => {
    bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS!))
        .then((salt: string) => Helpers._hashPassword(req.body.password, salt))
        .then((hashedPassword: string) => Helpers._fillUser(req.body, hashedPassword))
        .then((filledUser: IUser) => repository.addOne(Users, filledUser, res))
        .catch((err) => Helpers._sendResponse(err, res))

}

const login = (req: Request, res: Response) => {
    const response = Helpers._createResponse();
    const { email, password } = req.body;
    Users.findOne({ email })
        .then((foundedUser: IUser | null) => Helpers._checkIfDataExiste(foundedUser))
        .then((user) => Helpers._checkPassword(user as IUser, password))
        .then((user) => Helpers._generateToken(user as IUser))
        .then((token) => Helpers._setResponse(response, token, STATUS_CODES.OK))
        .catch((err: string) => Helpers._setResponse(response, err, STATUS_CODES.INTERNAL_SERVER_ERROR))
        .finally(() => Helpers._sendResponse(response, res))
}

export default {
    getAll,
    getOne,
    addOne,
    login
}