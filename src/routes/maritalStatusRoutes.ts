import { Router, Request } from 'express';
const { body } = require('express-validator');


import {
newFormMaritalStatusRender,
getMaritalStatusRender,
editFormMaritalStatusRender,
putMaritalStatus,
postMaritalStatus,ECApi

} from '../controllers/maritalStatus';

import {authenticate} from '../middlewares/authenticate';
import {getMaritalStatus,getMaritalStatuss} from '../middlewares/maritalStatus';
import {canIAccess} from '../middlewares/permissions'

const router = Router();

router.get("/ECApi",authenticate, getMaritalStatuss,canIAccess('estado_civil','get'), ECApi);

router.get("/estado-civil",authenticate, getMaritalStatuss,canIAccess('estado_civil','get'), getMaritalStatusRender);

router.get("/estado-civil/nuevo",authenticate,canIAccess('estado_civil','get'), newFormMaritalStatusRender);

router.get("/estado-civil/:id",authenticate, getMaritalStatus,canIAccess('estado_civil','get'), editFormMaritalStatusRender);

router.put("/estado-civil/:id",authenticate,canIAccess('estado_civil','get'), [ body('nombre').not().isEmpty().trim().escape()],  putMaritalStatus);

router.post("/estado-civil/nuevo",authenticate,canIAccess('estado_civil','get'),[ body('nombre').not().isEmpty().trim().escape()], postMaritalStatus);

export default router;