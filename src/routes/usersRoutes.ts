import { Request, Response, NextFunction, Router } from 'express';
import * as jwt from 'jsonwebtoken';
import User from '../models/user';

class UserRoutes {

    router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }
     // promise || void es el tipo de dato que va a retornar la funcion 
       /** await solo funciona para los async lo que hace es esperar la repuesta para continuar**/
    /** tambien se pueden utilizar una promesa**/
    public async createuser(req: Request, res: Response):Promise<void> {
        const NewUser = new User(req.body);
        await NewUser.save();
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

    public async getuser(req: Request, res: Response):Promise<void> {
        const user = await User.find();
        res.json(user);
    }
    public async updteuser(req: Request, res: Response):Promise<void> {      
        const upuser = await User.findOneAndUpdate({username:req.params.username},req.body, {new:true});
        res.json(upuser);

    }
    public async deleteuser(req: Request, res: Response):Promise<void> {
        const deteleuser = await User.findOneAndDelete({username:req.params.username});
        res.json({response:'delete success'});
    }
    routes() {
        this.router.get('/', this.getuser);
        this.router.get('/:username', this.getOneuser);
        this.router.post('/', this.createuser);
        this.router.put('/:username', this.updteuser);
        this.router.delete('/:username', this.deleteuser);
    }

}

const userRoutes = new UserRoutes();
export default userRoutes.router;

