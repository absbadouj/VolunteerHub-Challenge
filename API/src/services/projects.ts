import { Response } from "express";
import mongoose from "mongoose";

import MODELS from "../enums/models";
import { IProject } from "../models/project";
import { IOrganisation } from "../models/organisation";
import STATUS_CODES from "../enums/statusCode";

const Project = mongoose.model(MODELS.PROJECT)
const Organisation = mongoose.model(MODELS.ORGANISATION)

function addProject(organizationId: string, project: IProject, res: Response) {
    const newProject = new Project({ ...project });
    newProject.save()
        .then((project: { _id: string; }) => {
            const projectId = project._id;
            Organisation.findOneAndUpdate(
                { _id: organizationId },
                { $push: { projects: projectId } },
                { new: true }
            )
                .then((updatedOrganization: IOrganisation) => {
                    res.json(updatedOrganization).status(STATUS_CODES.OK);
                })
                .catch((error: Error) => {
                    console.error(error);
                });
        })
        .catch((error: Error) => {
            console.error(error);
        });
}

export default addProject; 