
import mongoose, { Document } from "mongoose";
import MODELS from "../enums/models";
import addresSchema, { IAddress } from "./address";
import { IProject } from "./project";
import { IUser } from "./user";

export interface IOrganisation extends Document {
    name: string;
    yearFounded: Date;
    website: string;
    phone: Number;
    amountRaised: Number;
    description: string;
    address: IAddress;
    projects: IProject[];
    members: IUser[];
}

const organisationSchema = new mongoose.Schema<IOrganisation & Document>({
    name: {
        type: String,
        required: [true, "Organisation name is required"]
    },
    yearFounded: {
        type: Date,
        required: [true, "Year Founded is required"]
    },
    website: String,
    amountRaised: {
        type: Number,
        default: 0,
    },
    phone: {
        type: Number,
        required: [true, "Phone is required"]
    },
    description: {
        type: String,
        required: [true, "Description is required"]
    },
    address: {
        type: addresSchema,
        required: [true, "Location is required"]
    },
    projects: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: MODELS.PROJECT }],
        default: []
    },
    members: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: MODELS.USERS }],
        required: [true, "Organisation should have at least one member"]
    }
})


mongoose.model<IOrganisation>(MODELS.ORGANISATION, organisationSchema);
