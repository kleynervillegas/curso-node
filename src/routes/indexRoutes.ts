import { request, Response, Router } from 'express';

class IndexRuoter {
    //inicializo la variable
    router: Router;

    constructor() {
        this.router = Router();
        this.routes
    }
    routes() {
        this.router.get('/', (req, res) => { res.send('Api: /api/posts'); });
    }
}
//creo una const para almacenar la class
const indexRuoter = new IndexRuoter();
///luego el metodo que quiero utilizar 
indexRuoter.routes();
export default indexRuoter.router;

