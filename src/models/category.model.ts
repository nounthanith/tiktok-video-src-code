import mongoose, { Model, Schema } from "mongoose";
import { ICategory } from "../types/category.type";

const categorySchema = new Schema<ICategory>(
    {
        name: { type: String, required: true, unique: true, trim: true },
        image: { type: String, default: "" },
        description: { type: String, default: "None" }
    },
    { timestamps: true }
)

const Category: Model<ICategory> = mongoose.models.Category ?? mongoose.model<ICategory>("Category", categorySchema);

export default Category;