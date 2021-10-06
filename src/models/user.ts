import {Schema, model } from "mongoose";
import post from "./post";

const UserSchema = new Schema ({
    name: { type: String, required: true},
    emial:{ type: String, required: true, unique: true},
    password:{ type: String, required: true},
    username: { type: String, required: true},
    createAt: { type: Date, default: Date.now},
    updateAt: { Date},
    posts :[{
        type: Schema.Types.ObjectId,
        ref: post
    }]
});

export default model(' User', UserSchema);