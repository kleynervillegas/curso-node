"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const post_1 = __importDefault(require("./post"));
const UserSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    emial: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    username: { type: String, required: true },
    createAt: { type: Date, default: Date.now },
    updateAt: { Date },
    posts: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: post_1.default
        }]
});
exports.default = (0, mongoose_1.model)(' User', UserSchema);
