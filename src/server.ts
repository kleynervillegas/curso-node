import express from "express";
import morgan from "morgan"
import helmet from "helmet";
import indexRoutes from "./routes/indexRoutes";
import PostRoutes from "./routes/postsRoutes";
import usersRoutes from "./routes/usersRoutes";
import * as mongoose from 'mongoose';
import compression from "compression";
import * as bodyParser from 'body-parser';
import cors from "cors";
import { Request, Response, NextFunction, Router } from 'express';
const node_env = process.env.NODE_ENV || 'development';
require('dotenv-json-complex')({ environment: node_env });



//aqui se crearan todos los method
class Server {
    //asignar tipo de variable
    public app: express.Application;
    constructor() {
        //esto es lo primero que se va a ejecutar metodos
        this.app = express();
        this.config();
        this.routes();
        this.start();

    }
    config() {
        ////conexion a la bd 
        const mongoose = require('mongoose');
        // colocamos la url de conexión local y el nombre de la base de datos
        // mongoose.connect(mongoUrl).then(()=>{console.log('base de datos conectado')})
        mongoose.set('debug', true)
        mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(console.log('base de datos conectado'));
        ///       

        //configuracion del puerto
        this.app.set('port', process.env.PORT );
        ///
        //configuracion de middlewares  
        this.app.use(morgan('dev'));
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(helmet());
        this.app.use(compression());
        this.app.use(cors());
    }
    routes() {
        this.app.use(indexRoutes);
        this.app.use('/api/posts', PostRoutes);
        this.app.use('/api/users', usersRoutes);
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('server on port', this.app.get('port'));
        });
    }
}

const server = new Server();
export default server;
// server.start();