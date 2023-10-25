import { AnyObject, FilterQuery, Model } from "mongoose";
import { Response } from "express";

import Helpers from "../helpers";
import STATUS_CODES from "../enums/statusCode";


const getAll = <RecordType>(model: Model<RecordType>, offset: number, count: number, res: Response) => {
    const response = Helpers._createResponse();
    return model.find({}).skip(offset).limit(count)
        .then((data) => Helpers._setResponse(response, data, STATUS_CODES.OK))
        .catch((err) => Helpers._setResponse(response, err, STATUS_CODES.INTERNAL_SERVER_ERROR))
        .finally(() => Helpers._sendResponse(response, res));
}

const getOne = <RecordType>(model: Model<RecordType>, id: string, res: Response, propriety: string | null = null) => {
    const response = Helpers._createResponse();
    model.findOne({ _id: id })
        .then((data) => Helpers._extractValue(data, propriety))
        .then((data) => Helpers._checkIfDataExiste(data))
        .then((data) => Helpers._setResponse(response, data, STATUS_CODES.OK))
        .catch((err) => Helpers._setResponse(response, err, STATUS_CODES.NOT_FOUND))
        .finally(() => Helpers._sendResponse(response, res));

}

const addOne = <RecordType>(model: Model<RecordType>, newObject: AnyObject, res: Response) => {
    const response = Helpers._createResponse();
    const item = new model({ ...newObject });
    item.save()
        .then((data) => Helpers._setResponse(response, data, STATUS_CODES.CREATED))
        .catch((err) => Helpers._setResponse(response, err, STATUS_CODES.INTERNAL_SERVER_ERROR))
        .finally(() => Helpers._sendResponse(response, res));
}

const editOne = <RecordType>(model: Model<RecordType>, id: string, newObject: AnyObject, res: Response) => {
    const response = Helpers._createResponse();
    model.findByIdAndUpdate(id, newObject, { new: true })
        .then((data) => Helpers._checkIfDataExiste(data))
        .then((data) => Helpers._setResponse(response, data, STATUS_CODES.ACCEPTED))
        .catch((err) => Helpers._setResponse(response, err, STATUS_CODES.INTERNAL_SERVER_ERROR))
        .finally(() => Helpers._sendResponse(response, res));
}

const deleteById = <RecordType>(model: Model<RecordType>, id: string, res: Response) => {
    const response = Helpers._createResponse();
    model.findByIdAndDelete(id)
        .then((data) => Helpers._checkIfDataExiste(data))
        .then((foundedData) => Helpers._setResponse(response, foundedData, STATUS_CODES.ACCEPTED))
        .catch((err: string) => Helpers._setResponse(response, err, STATUS_CODES.INTERNAL_SERVER_ERROR))
        .finally(() => Helpers._sendResponse(response, res));
}

const count = <RecordType>(model: Model<RecordType>, res: Response) => {
    const response = Helpers._createResponse();
    model.countDocuments()
        .then((data) => Helpers._setResponse(response, data, STATUS_CODES.OK))
        .catch((err) => Helpers._setResponse(response, err, STATUS_CODES.INTERNAL_SERVER_ERROR))
        .finally(() => Helpers._sendResponse(response, res));
}

const getOneBy = <RecordType>(model: Model<RecordType>, data: FilterQuery<RecordType> | undefined, res: Response) => {
    const response = Helpers._createResponse();
    model.findOne(data)
        // .then((data) => Helpers._extractValue(data, null))
        .then((data) => Helpers._setResponse(response, data, STATUS_CODES.OK))
        .catch((err) => Helpers._setResponse(response, err, STATUS_CODES.INTERNAL_SERVER_ERROR))
        .finally(() => Helpers._sendResponse(response, res));
}

const repository = {
    getAll,
    getOne,
    addOne,
    editOne,
    deleteById,
    count,
    getOneBy

}


export default repository;