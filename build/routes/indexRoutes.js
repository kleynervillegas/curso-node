"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class IndexRuoter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.routes;
    }
    routes() {
        this.router.get('/', (req, res) => { res.send('Api: /api/posts'); });
    }
}
//creo una const para almacenar la class
const indexRuoter = new IndexRuoter();
///luego el metodo que quiero utilizar 
indexRuoter.routes();
exports.default = indexRuoter.router;
