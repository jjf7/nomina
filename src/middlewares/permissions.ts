import {Request,Response,NextFunction} from 'express';
import {getConnection} from '../database';
import {IRequest} from '../interfaces' 
 
export const canIAccess = (per:string,doit:string) => {
	return( (req:IRequest,res:Response,next:NextFunction): Response | void=>{
		
		
		if(req.permissionsApp!==undefined){
			
				if(req.permissionsApp.find( p => p.id_usuario===req.user.id && p.permiso===per && p.doit === doit )){
					 return next();
				}
				
				req.flash('error', 'No estas autorizado ...');
				return res.status(403).redirect('back');
				
			}
			
			req.flash('error', 'No estas autorizado ...');
			return res.status(403).redirect('back');
	}
	)
}


 
export async function usersRequest(req:IRequest,res:Response,next:NextFunction):Promise<void | Response>{
	
	 try{
		
		const conn = await getConnection(req.user.bd);
		
		const [results] = await conn.query('select * from users');
	 
	    const rows = JSON.parse(JSON.stringify(results));
		
		req.users = rows;
		
		conn.end();
		
		return next();
		
	}catch(e){
		req.flash('error',e.message);
		return res.redirect('/usuarios');
	}
	 
} 
 
export const usersDoitRequest = async(req:IRequest,res:Response,next:NextFunction) => {
	
	try{
		
		const conn = await getConnection(req.user.bd);
		
		const [results] = await conn.query('select PD.* from permisos_usuarios as PU join permisos_usuarios_do PD on PU.id=PD.id_permisos_usuarios  where PU.id_usuario=?',[req.query.id]);
		
		const rows = JSON.parse(JSON.stringify(results));
		
	    req.doits = rows;
		
		conn.end();
		
		return next();
	
	}catch(e){
		return res.status(500).send(e);
	}
	
}

 
export const userPermissionsMiddlewares = async(req:IRequest,res:Response,next:NextFunction) => {
	
	try{
		
		
			const conn = await getConnection(req.user.bd);
			
			const [results] = await conn.query('select PU.id,P.permiso,PU.id_usuario from permisos_usuarios as PU join permisos as P on PU.id_permiso = P.id where PU.id_usuario=?',[req.query.id]);
			
			const rows = JSON.parse(JSON.stringify(results));
			
			req.permissionsUser = rows;
			
			conn.end();
			
			return next();
		
		
	}catch(e){
		return res.status(500).send(e);
	}
	
} 


export async function userRequest(req:IRequest,res:Response,next:NextFunction):Promise<void | Response>{
	
	 try{
		
		const conn = await getConnection(req.user.bd);
		
		const [results] = await conn.query('select * from users where id=?',[req.params.id]);
	 
	    const rows = JSON.parse(JSON.stringify(results));
		conn.end();
		
		
		if(rows.length>0){
			
			req.userDetail = rows[0];
			
			return next();
		}
		req.flash('error','User do not exist!!');
		return res.redirect('/usuarios');
		
		
	}catch(e){
		req.flash('error',e.message);
		return res.redirect('/usuarios');
	}
	 
} 
 
export const permissionsMiddlewareTable = async(req:IRequest,res:Response,next:NextFunction):Promise<Response | void> => {
	 
		try{
			
			const conn = await getConnection(req.user.bd);
			
			const [results] = await conn.query('select * from permisos where id NOT IN (select id_permiso from permisos_usuarios where id_usuario=?)',[req.query.id]);
			
			const rows = JSON.parse(JSON.stringify(results));
			
			req.permissions = rows;
			
			conn.end();
			return next();
			
		}catch(e){
			return res.status(500).send(e);
		}
		
}