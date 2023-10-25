import mongoose, { Document } from "mongoose";
import MODELS from "../enums/models";

export interface IUser extends Document {
    name: string;
    username: string;
    password: string;
    phone: string;
    email: string;
    amountDonated: Number;
}

const usersSchema = new mongoose.Schema<IUser & Document>({
    name: {
        type: String,
        required: [true, "User name is required"]
    },
    username: {
        type: String,
        unique: true,
        required: [true, "Username is required"],
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    phone: {
        type: String,
        required: [true, "Phone number is required"]
    },
    email: {
        type: String,
        required: [true, "email is required"]
    },
    amountDonated: {
        type: Number,
        default: 0,
    },

})


mongoose.model<IUser>(MODELS.USERS, usersSchema);
export default usersSchema;