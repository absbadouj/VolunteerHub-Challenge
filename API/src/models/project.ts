import mongoose, { Document } from "mongoose";
import MODELS from "../enums/models";

export interface IProject extends Document {
    title: string;
    projectCountry: string;
    category: string;
    phone: Number;
    summary: string;
    amountGoal: Number;
    amountRaised: Number;
    publishedAt: Date;
}


const projectSchema = new mongoose.Schema<IProject & Document>({
    title: {
        type: String,
        required: [true, "Title is required"]
    },
    projectCountry: {
        type: String,
        required: [true, "Project Country is required"]
    },
    category: {
        type: String,
        required: [true, "Category is required"]
    },
    amountGoal: {
        type: Number,
        required: [true, "Title is required"],
        min: [500, 'Amount Goal must be a positive number and at least 500$']
    },
    amountRaised: {
        type: Number,
        default: 0
    },
    summary: {
        type: String,
        required: [true, "Summary is required"],
        minlength: [250, 'Content must be at least 250 characters long']
    },
    publishedAt: {
        type: Date,
        "default": new Date()
    }

})

mongoose.model<IProject>(MODELS.PROJECT, projectSchema);
export default projectSchema;