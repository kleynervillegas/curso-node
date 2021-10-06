import { Request, Response, NextFunction, Router } from 'express';
import post from '../models/post';


class PostRoutes {

    router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    public async pruebajwl(req: Request, res: Response):Promise<void> {
        const deteleposts = await post.findOneAndDelete({title:req.params.url});
        res.json({response:'delete success'});
    }


     // promise || void es el tipo de dato que va a retornar la funcion 
       /** await solo funciona para los async lo que hace es esperar la repuesta para continuar**/
    /** tambien se pueden utilizar una promesa**/
    public async createPosts(req: Request, res: Response):Promise<void> {
        const { title, url, content, image } = req.body;
        const NewPost = new post({ title, url, content, image });
        await NewPost.save();
        res.json({ data: NewPost });
    }
    public async getOnePosts(req: Request, res: Response): Promise<void> {
        const onePost = await post.findOne({ title: req.params.url });
        res.json(onePost);
    }
  
    // getPosts(req: Request, res: Response) {
    //      post.find().then((data) => {
    //         return res.json(data);
    //     }).catch((error) => {
    //             throw error;
    //         });
    // }

    public async getPosts(req: Request, res: Response):Promise<void> {
        const posts = await post.find();
        res.json(posts);
    }
    public async updtePost(req: Request, res: Response):Promise<void> {      
        const upposts = await post.findOneAndUpdate({title:req.params.url},req.body, {new:true});
        res.json(upposts);

    }
    public async deletePost(req: Request, res: Response):Promise<void> {
        const deteleposts = await post.findOneAndDelete({title:req.params.url});
        res.json({response:'delete success'});
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
export default postsRoutes.router;

