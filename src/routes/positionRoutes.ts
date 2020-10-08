import { Router, Request } from 'express';
const { body } = require('express-validator');

import {
newFormPositionRender,
getPositionRender,
editFormPositionRender,
putPosition,
postPosition,CargoApi,CargoApiId

} from '../controllers/position';

import {authenticate} from '../middlewares/authenticate';
import {getPosition,getPositions} from '../middlewares/position';
import {canIAccess} from '../middlewares/permissions'

const router = Router();



router.get("/CargoApi/:id",authenticate, getPosition,canIAccess('cargos','get'), CargoApiId);


router.get("/CargoApi",authenticate, getPositions,canIAccess('cargos','get'), CargoApi);


router.get("/cargos",authenticate, getPositions,canIAccess('cargos','get'), getPositionRender);

router.get("/cargos/nuevo",authenticate,canIAccess('cargos','post'), newFormPositionRender);

router.get("/cargos/:id",authenticate, getPosition,canIAccess('cargos','put'), editFormPositionRender);

router.put("/cargos/:id",authenticate,canIAccess('cargos','put'), [ body('nombre').not().isEmpty().trim().escape(),
										body('sueldo').not().isEmpty().isFloat(),
										body('sueldovar').not().isEmpty().isFloat(),
										body('descripcion').not().isEmpty().trim().escape()
										],  putPosition);

router.post("/cargos/nuevo",authenticate,canIAccess('cargos','post'),[ body('nombre').not().isEmpty().trim().escape(),
										body('sueldo').not().isEmpty().isFloat(),
										body('sueldovar').not().isEmpty().isFloat(),
										body('descripcion').not().isEmpty().trim().escape()
										], postPosition);

export default router;