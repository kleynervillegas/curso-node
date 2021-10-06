"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const post_1 = __importDefault(require("../models/post"));
class PostRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.routes();
    }
    pruebajwl(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const deteleposts = yield post_1.default.findOneAndDelete({ title: req.params.url });
            res.json({ response: 'delete success' });
        });
    }
    // promise || void es el tipo de dato que va a retornar la funcion 
    /** await solo funciona para los async lo que hace es esperar la repuesta para continuar**/
    /** tambien se pueden utilizar una promesa**/
    createPosts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title, url, content, image } = req.body;
            const NewPost = new post_1.default({ title, url, content, image });
            yield NewPost.save();
            res.json({ data: NewPost });
        });
    }
    getOnePosts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const onePost = yield post_1.default.findOne({ title: req.params.url });
            res.json(onePost);
        });
    }
    // getPosts(req: Request, res: Response) {
    //      post.find().then((data) => {
    //         return res.json(data);
    //     }).catch((error) => {
    //             throw error;
    //         });
    // }
    getPosts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const posts = yield post_1.default.find();
            res.json(posts);
        });
    }
    updtePost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const upposts = yield post_1.default.findOneAndUpdate({ title: req.params.url }, req.body, { new: true });
            res.json(upposts);
        });
    }
    deletePost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const deteleposts = yield post_1.default.findOneAndDelete({ title: req.params.url });
            res.json({ response: 'delete success' });
        });
    }
    routes() {
        this.router.get('/', this.getPosts);
        this.router.get('/:url', this.getOnePosts);
        this.router.post('/', this.createPosts);
        this.router.put('/:url', this.updtePost);
        this.router.delete('/:url', this.deletePost);
        this.router.get('/pruebajwl', this.pruebajwl);
    }
}
const postsRoutes = new PostRoutes();
exports.default = postsRoutes.router;
