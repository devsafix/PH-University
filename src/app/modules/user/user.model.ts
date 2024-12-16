import { model, Schema } from "mongoose";
import { TUser } from "./user.interface";
import config from "../../config";
import bcrypt from "bcrypt";

const userSchema = new Schema<TUser>(
    {
        id: { type: String, required: true ,unique:true },
        password: { type: String},
        needsPasswordChange: { type: Boolean, default: true },
        passwordChangeAt:{type:Date},
        role: { type: String, enum: ["admin", "student", "faculty"] },
        status: { type: String, enum: ["in-progress", "blocked"], default: "in-progress" },
        isDeleted: { type: Boolean, default: false },
    },
    {
        timestamps: true,
    }
);

// Pre-save middleware
userSchema.pre("save", async function (next) {
    try {
        const user = this as TUser;
        if (user.password) {
            // Only hash the password if it's not already hashed
            user.password = await bcrypt.hash(user.password, Number(config.salt_round));
        }
        next();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error:any) {
        next(error);
    }
});

// Post-save middleware
userSchema.post("save", function (doc, next) {
    try {
        // Avoid sending the password back to the client
        doc.password = undefined;
        console.log(doc, "User data saved successfully");
        next();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error:any) {
        next(error);
    }
});

export const userModel = model<TUser>("user", userSchema);
