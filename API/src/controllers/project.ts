import mongoose, { Model } from "mongoose";
import { Request, Response } from "express";

import STATUS_CODES from "../enums/statusCode";
import Helpers from "../helpers";
import MODELS from "../enums/models";
import repository from "../repositories";
import addProject from "../services/projects";
import { IProject } from "../models/project";
import { ResponseObj } from "../helpers/index";

const Projects: Model<IProject> = mongoose.model<IProject>(MODELS.PROJECT);
const Organisation = mongoose.model(MODELS.ORGANISATION)


const getAll = (req: Request, res: Response) => {
    let offset: number | undefined = parseInt(process.env.OFFSET!);
    let count: number | undefined = parseInt(process.env.COUNT!);
    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset as string);
    }
    if (req.query && req.query.count) {
        count = parseInt(req.query.count as string);
    }
    repository.getAll(Projects, offset, count, res)
}

const getById = (req: Request, res: Response) => {
    const projectId: string = req.params.projectId;
    repository.getOne(Projects, projectId, res);

}

const insert = (req: Request, res: Response) => {
    addProject(req.params.organisationId, req.body, res)
}


const getByOrganisations = (req: Request, res: Response) => {
    const response: ResponseObj = Helpers._createResponse();
    Organisation.findById(req.params.organisationId)
        .populate('projects')
        .then((data: IProject[]) => Helpers._setResponse(response, data, STATUS_CODES.OK))
        .catch((err: mongoose.Error) => Helpers._setResponse(response, err, STATUS_CODES.INTERNAL_SERVER_ERROR))
        .finally(() => Helpers._sendResponse(response, res));
}


export default {
    getAll,
    getById,
    insert,
    getByOrganisations
}


