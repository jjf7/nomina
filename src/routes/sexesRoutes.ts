import { Router, Request } from 'express';
const { body } = require('express-validator');


import {
newFormSexesRender,
getSexesRender,
editFormSexesRender,
putSexes,
postSexes,sexApi

} from '../controllers/sexes';

import {authenticate} from '../middlewares/authenticate';
import {getSex,getSexes} from '../middlewares/sexes';
import {canIAccess} from '../middlewares/permissions'

const router = Router();

router.get("/sexApi",authenticate, getSexes,canIAccess('sexo','get'), sexApi);

router.get("/sexo",authenticate, getSexes,canIAccess('sexo','get'), getSexesRender);

router.get("/sexo/nuevo",authenticate,canIAccess('sexo','get'), newFormSexesRender);

router.get("/sexo/:id",authenticate, getSex,canIAccess('sexo','get'), editFormSexesRender);

router.put("/sexo/:id",authenticate,canIAccess('sexo','get'), [ body('nombre').not().isEmpty().trim().escape()],  putSexes);

router.post("/sexo/nuevo",authenticate,canIAccess('sexo','get'),[ body('nombre').not().isEmpty().trim().escape()], postSexes);

export default router;