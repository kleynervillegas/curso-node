"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const http_1 = require("http");
const jwt = __importStar(require("jsonwebtoken"));
const user_1 = __importDefault(require("../models/user"));
class UserRoutes {
    constructor() {
        this.server = new http_1.Server();
        this.router = (0, express_1.Router)();
        this.routes();
    }
    // promise || void es el tipo de dato que va a retornar la funcion 
    /** await solo funciona para los async lo que hace es esperar la repuesta para continuar**/
    /** tambien se pueden utilizar una promesa**/
    createuser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, emial, password, username } = req.body;
            const payload = {
                check: true
            };
            const NewUser = new user_1.default({ name, emial, password, username });
            yield NewUser.save();
            const jwtoken = jwt.sign(payload, "secrets.jwtecret");
            const savetoken = yield user_1.default.findOneAndUpdate({ name: name }, { token: jwtoken }, { new: true });
            res.json({ data: NewUser });
        });
    }
    getOneuser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.params.username);
            const oneUser = yield user_1.default.findOne({ username: req.params.username }).populate('posts');
            res.json(oneUser);
        });
    }
    // getuser(req: Request, res: Response) {
    //      User.find().then((data) => {
    //         return res.json(data);
    //     }).catch((error) => {
    //             throw error;
    //         });
    // }
    getuser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_1.default.find();
            res.json(user);
        });
    }
    updteuser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const upuser = yield user_1.default.findOneAndUpdate({ username: req.params.username }, req.body, { new: true });
            res.json(upuser);
        });
    }
    deleteuser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const deteleuser = yield user_1.default.findOneAndDelete({ username: req.params.username });
            res.json({ response: 'delete success' });
        });
    }
    //  preubaToken(req: Request, res: Response){
    //     if (req.body.usuario === "kleyner" && req.body.contrasena === "1234") {
    //         const payload = {
    //             check: true
    //         };
    //         const token = jwt.sign(payload, secrets.jwtSecret);
    //         res.json({
    //             mensaje: 'Autenticaci??n correcta',
    //             token: token
    //         });
    //     } else {
    //         res.json({ mensaje: "Usuario o contrase??a incorrectos" })
    //     }
    // }
    routes() {
        this.router.get('/', this.getuser);
        this.router.get('/getone/:username', this.getOneuser);
        this.router.post('/', this.createuser);
        this.router.put('/:username', this.updteuser);
        this.router.delete('/deleteuser/:username', this.deleteuser);
        // this.router.post('/preubaToken', this.preubaToken);
    }
}
const userRoutes = new UserRoutes();
exports.default = userRoutes.router;
