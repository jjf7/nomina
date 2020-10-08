 import {Router} from 'express';
import {signin,
signinRender,
signup,
signupRender,
logout} from '../controllers/auth.controller'

import {authenticate,checkAuthenticate} from '../middlewares/authenticate';

const router = Router();

router.get('/',checkAuthenticate, signinRender);
router.post('/',checkAuthenticate, signin);

router.get('/dashboard',authenticate, (req,res)=>{
	res.render('dashboard')
})

router.get('/registro',signupRender);
router.post('/registro',signup);

router.get('/logout', logout);

export default router;