import express,{Router} from 'express'
import {authenticate} from '../middlewares/authenticate'
import {getAllUsers} from '../middlewares/users'
import {getConnection} from '../database'
import {permissionsMiddlewareTable,userRequest,userPermissionsMiddlewares,usersDoitRequest,usersRequest,canIAccess} from '../middlewares/permissions'
import {IRequest} from '../interfaces'
const router = Router();


router.get('/usuarios',authenticate,getAllUsers,canIAccess('usuarios','get'),(req:IRequest,res:express.Response) => {
	res.render('listUsersHTML',{results:req.allUsers});
});

router.get('/users/permissions/doits',authenticate,usersDoitRequest,canIAccess('permisos','get'),(req:IRequest,res:express.Response) =>{
	
	res.json({resultDoits:req.doits});
	
})


router.get('/usuarios/permisos/:id',authenticate, userRequest, canIAccess('permisos','get'), (req:IRequest,res:express.Response) => {
	res.render('listUsersPermissionsHTML',{userDetail:req.userDetail});
});

router.get('/permissions', authenticate,  permissionsMiddlewareTable,  canIAccess('permisos','get'), (req:IRequest,res:express.Response) => {
	
	res.json({permissions:req.permissions})
});


router.get('/users/permissions', authenticate, userPermissionsMiddlewares, canIAccess('permisos','get'),(req:IRequest,res:express.Response) => {
	
	res.json({permissionsUsers:req.permissionsUser});
	
})


//POST


router.post('/users/permissions/add/permission' ,authenticate, canIAccess('permisos','post'),async (req:IRequest,res:express.Response) => {
	
	const { id, doit } = req.body;
	
	try{
		
		const conn = await getConnection(req.user.bd);
		
		await conn.query('insert into permisos_usuarios_do (id_permisos_usuarios,doit) values(?,?)',[id,doit])
		
		conn.end();
		
		res.status(201).json('success');
		
	}catch(e){
		res.status(500).json(e);
	}
	
})

router.post('/usuarios/permisos/:id', authenticate, userRequest, canIAccess('permisos','post'),async(req:IRequest,res:express.Response): Promise<Response | void> => {
	
	const { permissions } = req.body;
	
	
	if(permissions===undefined)
	{
		req.flash('msgDanger','Field not be empty...');
		
		return res.redirect('/usuarios/permisos/'+req.params.id)
	}
	
	try{
		
		
		const conn = await getConnection(req.user.bd);
		
		//  '10'  OR  [2,3,5]  
		
		const tipo = typeof(permissions);
		
		
		if(tipo==="string"){
			
			await conn.query('insert into permisos_usuarios(id_usuario,id_permiso) values(?,?)',[req.params.id,permissions])
				
			
		}else{
			for(var i=0; i<permissions.length;i++){
			     
await conn.query('insert into permisos_usuarios(id_usuario,id_permiso) values(?,?)',[req.params.id,permissions[i]])

			}	

		}
		
		conn.end();
		
		req.flash('msgSuccess','El permiso ha sido asignado correctamente');
	
	    res.redirect('/usuarios/permisos/'+req.params.id);
		
	}catch(e){
		
		res.status(500).send(e.message)
		
	}
	
	
})

// DELETE



router.delete('/users/permissions/delete/permission',authenticate,canIAccess('permisos','delete'),async (req:IRequest,res:express.Response):Promise<Response | void> => {
	
	try{
		
		
		const conn = await getConnection(req.user.bd);
		
		const result =await conn.query('delete from permisos_usuarios_do where id_permisos_usuarios=? and doit=?',[req.body.id,req.body.doit]);
		
		conn.end();
		
		res.json('Deleted');
	}catch(e){
		res.status(500).json(e);
	}
	
	
	
})

router.delete('/usuarios/permisos/:id', authenticate, usersRequest ,canIAccess('permisos','delete'), async(req:IRequest,res:express.Response) => {
	
	try{
		
		const conn = await getConnection(req.user.bd);
		
		await conn.query("delete from permisos_usuarios_do where  id_permisos_usuarios=?",[req.body.id]);
		
		await conn.query("delete from permisos_usuarios where id_usuario=? and id=?",[req.params.id,req.body.id]);
		
		req.flash('msgSuccess','El permiso ha sido removido');
		
		conn.end();
		
		return res.redirect('/usuarios/permisos/'+req.params.id)
		
	}catch(e){
		return res.status(500).send(e);
	}
	
})

export default router;


