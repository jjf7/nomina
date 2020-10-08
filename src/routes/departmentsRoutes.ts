import {Router} from 'express';
const { body } = require('express-validator');


import {
newFormDepartmentsRender,
getDepartmentsRender,
editFormDepartmentsRender,
putDepartments,
postDepartments,departamentoApi

} from '../controllers/departments';

import {authenticate} from '../middlewares/authenticate';
import {getDepartment,getDepartments} from '../middlewares/departments';
import {canIAccess} from '../middlewares/permissions'

const router = Router();



router.get("/departamentoApi",authenticate, getDepartments,canIAccess('departamentos','get'), departamentoApi);

router.get("/departamentos",authenticate, getDepartments,canIAccess('departamentos','get'), getDepartmentsRender);

router.get("/departamentos/nuevo",authenticate,canIAccess('departamentos','get'), newFormDepartmentsRender);

router.get("/departamentos/:id",authenticate, getDepartment,canIAccess('departamentos','get'), editFormDepartmentsRender);

router.put("/departamentos/:id",authenticate,canIAccess('departamentos','get'), [ body('nombre').not().isEmpty().trim().escape()
										],  putDepartments);

router.post("/Departamentos/nuevo",authenticate,canIAccess('departamentos','get'),[ body('nombre').not().isEmpty().trim().escape()
										], postDepartments);

export default router;