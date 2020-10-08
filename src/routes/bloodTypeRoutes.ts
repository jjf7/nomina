import { Router, Request } from 'express';
const { body } = require('express-validator');

import {
newFormBloodTypeRender,
getBloodTypesRender,
editFormBloodTypeRender,
putBloodType,
postBloodType,GSApi

} from '../controllers/bloodType';

import {authenticate} from '../middlewares/authenticate';
import {getBloodType,getBloodTypes} from '../middlewares/bloodType';
import {canIAccess} from '../middlewares/permissions'

const router = Router();

router.get("/GSApi",authenticate, getBloodTypes,canIAccess('grupo_sanguineo','get'), GSApi);

router.get("/grupos-sanguineos",authenticate, getBloodTypes,canIAccess('grupo_sanguineo','get'), getBloodTypesRender);

router.get("/grupos-sanguineos/nuevo",authenticate,canIAccess('grupo_sanguineo','get'), newFormBloodTypeRender);

router.get("/grupos-sanguineos/:id",authenticate, getBloodType,canIAccess('grupo_sanguineo','get'), editFormBloodTypeRender);

router.put("/grupos-sanguineos/:id",authenticate,canIAccess('grupo_sanguineo','get'), [ body('nombre').not().isEmpty().trim().escape()], putBloodType);

router.post("/grupos-sanguineos/nuevo",authenticate,canIAccess('grupo_sanguineo','get'),[ body('nombre').not().isEmpty().trim().escape()], postBloodType);

export default router;