import {Router} from 'express';
import {newFormEmployeeRender,getEmployeesRender,postEmployees} from '../controllers/employee'
const router = Router();

import {authenticate} from '../middlewares/authenticate';

import {canIAccess} from '../middlewares/permissions'

router.get('/empleados/nuevo',authenticate, canIAccess('empleados','get'), newFormEmployeeRender)
router.get('/empleados',authenticate, canIAccess('empleados','get'), getEmployeesRender)

router.post('/empleados',authenticate, canIAccess('empleados','post'), postEmployees)

export default router;