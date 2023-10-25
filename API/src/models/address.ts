import { Schema, Document } from "mongoose";

export interface IAddress extends Document {
    address: string;
    country: string;
    city: string;
    zip: Number;
}

const addresSchema = new Schema<IAddress & Document>({
    address: {
        type: String,
        required: [true, "Location is required"]
    },
    country: {
        type: String,
        required: [true, "Country is required"]
    },
    city: {
        type: String,
        required: [true, "City is required"]
    },
    zip: {
        type: Number,
        required: [true, "Zip is required"],
    },
}, { _id: false })


export default addresSchema;