import {Request,Response,NextFunction} from 'express';
import {getConnection} from '../database';
import {IRequest} from '../interfaces/';

export const getDepartments = async(req:IRequest,res:Response,next:NextFunction):Promise<Response | void> => {
	
	try{
		
		const conn = await getConnection(req.user.bd);
	
	    const [results] = await conn.query('select * from departamentos');
		
		const rows = JSON.parse(JSON.stringify(results));
		
		req.departments=rows;
		
		return  next();
		
	}catch(e){
		
		return res.status(500).send(e.message);
	}

}


export const getDepartment = async(req:IRequest,res:Response,next:NextFunction):Promise<Response | void> => {
	
	const {id} = req.params;
	
	try{
		
		const conn = await getConnection(req.user.bd);
	
	    const [results] = await conn.query('select * from departamentos where id=?',[id]);
		
		const rows = JSON.parse(JSON.stringify(results));
		
		if(rows.length > 0){
			
			req.department = rows[0];
			
			return next();
		}
		
		req.flash('msgWarning','No existe el departamento');
		
		return res.redirect('/departamentos');
		
	}catch(e){
		
		return res.status(500).send(e.message);
	}
	
}