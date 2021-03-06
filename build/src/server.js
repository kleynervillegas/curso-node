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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const indexRoutes_1 = __importDefault(require("./routes/indexRoutes"));
const postsRoutes_1 = __importDefault(require("./routes/postsRoutes"));
const usersRoutes_1 = __importDefault(require("./routes/usersRoutes"));
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
const bodyParser = __importStar(require("body-parser"));
const config_1 = __importDefault(require("../configs/config"));
//aqui se crearan todos los method
class Server {
    constructor() {
        //esto es lo primero que se va a ejecutar metodos
        this.app = (0, express_1.default)();
        this.config();
        this.routes();
    }
    config() {
        ////conexion a la bd 
        const mongoose = require('mongoose');
        // colocamos la url de conexión local y el nombre de la base de datos
        const mongoUrl = 'mongodb://localhost/restapit';
        // mongoose.connect(mongoUrl).then(()=>{console.log('base de datos conectado')})
        mongoose.set('debug', true);
        mongoose.connect(mongoUrl || process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(console.log('base de datos conectado'));
        ///       
        //configuracion del puerto
        this.app.set('port', process.env.Port || 3000);
        ///
        //configuracion de middlewares
        this.app.use((0, morgan_1.default)('dev'));
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
        this.app.use((0, helmet_1.default)());
        this.app.use((0, compression_1.default)());
        this.app.use((0, cors_1.default)());
        //////consig jwt
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());
        console.log(this.app.set('llave', config_1.default));
    }
    routes() {
        this.app.use(indexRoutes_1.default);
        this.app.use('/api/posts', postsRoutes_1.default);
        this.app.use('/api/users', usersRoutes_1.default);
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('server on port', this.app.get('port'));
        });
    }
}
const server = new Server();
server.start();
