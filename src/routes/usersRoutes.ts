import { Request, Response, NextFunction, Router } from 'express';
import { Server } from 'http';
import * as jwt from 'jsonwebtoken';
import User from '../models/user';
import server from '../server';
import { limitRequestBody, secrets } from '../configs/secrets';
import { token } from 'morgan';



class UserRoutes {
    server = new Server();
    router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }
    // promise || void es el tipo de dato que va a retornar la funcion 
    /** await solo funciona para los async lo que hace es esperar la repuesta para continuar**/
    /** tambien se pueden utilizar una promesa**/
    public async createuser(req: Request, res: Response): Promise<void> {
        const { name, emial, password, username} = req.body;
        const payload = {
            check: true
        };      
        
        const NewUser = new User({ name, emial, password, username });
        await NewUser.save();
        const jwtoken = jwt.sign(payload, "secrets.jwtecret");
        const savetoken = await User.findOneAndUpdate({ name:name },{token:jwtoken}, { new: true });
        res.json({ data: NewUser });
    }
    public async getOneuser(req: Request, res: Response): Promise<void> {
        console.log(req.params.username);
        const oneUser = await User.findOne({ username: req.params.username }).populate('posts');
        res.json(oneUser);
    }

    // getuser(req: Request, res: Response) {
    //      User.find().then((data) => {
    //         return res.json(data);
    //     }).catch((error) => {
    //             throw error;
    //         });
    // }

    public async getuser(req: Request, res: Response): Promise<void> {
        const user = await User.find();
        res.json(user);
    }
    public async updteuser(req: Request, res: Response): Promise<void> {
        const upuser = await User.findOneAndUpdate({ username: req.params.username }, req.body, { new: true });
        res.json(upuser);

    }
    public async deleteuser(req: Request, res: Response): Promise<void> {
        const deteleuser = await User.findOneAndDelete({ username: req.params.username });
        res.json({ response: 'delete success' });
    }

    //  preubaToken(req: Request, res: Response){

    //     if (req.body.usuario === "kleyner" && req.body.contrasena === "1234") {
    //         const payload = {
    //             check: true
    //         };
    //         const token = jwt.sign(payload, secrets.jwtSecret);
    //         res.json({
    //             mensaje: 'Autenticación correcta',
    //             token: token
    //         });
    //     } else {
    //         res.json({ mensaje: "Usuario o contraseña incorrectos" })
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
export default userRoutes.router;

