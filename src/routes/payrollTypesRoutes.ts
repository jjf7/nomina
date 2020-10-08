import {Router} from 'express';
const { body } = require('express-validator');

import {
newFormPayrollTypesRender,
getPayrollTypesRender,
editFormPayrollTypesRender,
putPayrollTypes,
postPayrollTypes,Tipo_nominaApi

} from '../controllers/payrollTypes';

import {authenticate} from '../middlewares/authenticate';
import {getPayrollType,getPayrollTypes} from '../middlewares/payrollTypes';
import {canIAccess} from '../middlewares/permissions'

const router = Router();

router.get("/Tipo_nominaApi",authenticate, getPayrollTypes,canIAccess('tipos_nominas','get'), Tipo_nominaApi);

router.get("/tipos-nominas",authenticate, getPayrollTypes,canIAccess('tipos_nominas','get'), getPayrollTypesRender);

router.get("/tipos-nominas/nuevo",authenticate,canIAccess('tipos_nominas','get'), newFormPayrollTypesRender);

router.get("/tipos-nominas/:id",authenticate,canIAccess('tipos_nominas','get'), getPayrollType, editFormPayrollTypesRender);

router.put("/tipos-nominas/:id",authenticate,canIAccess('tipos_nominas','get'), [ body('nombre').not().isEmpty().trim().escape()
										],  putPayrollTypes);

router.post("/tipos-nominas/nuevo",authenticate,canIAccess('tipos_nominas','get'),[ body('nombre').not().isEmpty().trim().escape()
										], postPayrollTypes);

export default router;