import { Request, Response } from "express";
import mongoose, { Model } from "mongoose";

import MODELS from "../enums/models";
import repository from "../repositories";
import { IOrganisation } from "../models/organisation";

const Organisations: Model<IOrganisation> = mongoose.model<IOrganisation>(
    MODELS.ORGANISATION
);

const getAll = async (req: Request, res: Response) => {
    let offset: number | undefined = parseInt(process.env.OFFSET!);
    let count: number | undefined = parseInt(process.env.COUNT!);
    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset as string);
    }
    if (req.query && req.query.count) {
        count = parseInt(req.query.count as string);
    }
    repository.getAll(Organisations, offset, count, res);
};

const getById = (req: Request, res: Response) => {
    const organisationId: string = req.params.organisationId;
    repository.getOne(Organisations, organisationId, res);
}


const insert = (req: Request, res: Response) => {
    const newOrganisation: IOrganisation = new Organisations({
        ...req.body
    });
    repository.addOne(Organisations, newOrganisation, res)
}

const edit = (req: Request, res: Response) => {
    const { organisationId } = req.params;
    const newOrganisation: IOrganisation = {
        ...req.body
    };
    repository.editOne(Organisations, organisationId, newOrganisation, res)
}

const deleteById = (req: Request, res: Response) => {
    const { organisationId } = req.params;
    repository.deleteById(Organisations, organisationId, res);
}


export default {
    getAll,
    getById,
    insert,
    edit,
    deleteById,
}