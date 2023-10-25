import { Response } from "express";
import STATUS_CODES from "../enums/statusCode";
import RETURN_MESSAGE from "../enums/returnMessage";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import util from "util";
import { IUser } from "../models/user";

export interface ResponseObj {
    message: string;
    status: number;
}

const _createResponse = (): ResponseObj => {
    return {
        message: RETURN_MESSAGE.DEFAULT_MESSAGE,
        status: STATUS_CODES.INTERNAL_SERVER_ERROR,
    }
}

const _sendResponse = (response: ResponseObj, res: Response): void => {
    res.status(response.status).json(response.message)
}

const _checkIfDataExiste = (data: any) => {
    return new Promise((resolve, reject) => {
        if (data) resolve(data)
        else reject(RETURN_MESSAGE.NO_RECORD_FOUND)
    })
}

const _hashPassword = (password: string, salt: string): Promise<string> => {
    return bcrypt.hash(password, salt)
}

const _fillUser = (user: IUser, hashedPassword: string): Promise<IUser> => {
    return new Promise(resolve => {
        user.password = hashedPassword;
        resolve(user)
    });
}

const _checkPassword = (user: IUser, requestpassword: string) => {
    return bcrypt.compare(requestpassword, user.password)
        .then((isPasswordmatch: boolean) => {
            return new Promise((resolve, reject) => {
                if (isPasswordmatch) {
                    resolve(user);
                } else reject(RETURN_MESSAGE.WRONG_LOGIN_DATA)
            })
        });
}

const _generateToken = (user: IUser) => {
    const jwtSignUsingPromise = util.promisify<IUser, jwt.Secret, jwt.SignOptions>(jwt.sign);
    return jwtSignUsingPromise(user, process.env.JWT_SECRET_KEY!, { expiresIn: process.env.JWT_EXPIRES_IN! });
}

const _setResponse = (responseObj: ResponseObj, message: any, status: number): ResponseObj => {
    responseObj.message = message;
    responseObj.status = status;
    return responseObj;
}

const _extractValue = (data: any, propriety: string | null) => {
    return new Promise((resolve) => {
        if (propriety) return resolve(data[propriety]);
        else return resolve(data)
    })
}
export default {
    // myCustomCallbackify,
    // callbackifyCallbackFunction,
    _setResponse,
    _sendResponse,
    _createResponse,
    _extractValue,
    _hashPassword,
    _fillUser,
    _checkIfDataExiste,
    _checkPassword,
    _generateToken
}