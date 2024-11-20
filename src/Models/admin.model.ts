import {Schema, model, models} from "mongoose";
import {AdminTypes} from "../Types/admin";

const AdminSchema = new Schema<AdminTypes>({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    
    },
    password: {
        type: String,
        required: true,
    },
}, {timestamps: true});

const adminModel = models?.Admin || model<AdminTypes>("Admin", AdminSchema);

export default adminModel