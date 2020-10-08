import {Request,Response,NextFunction} from 'express';
import {getConnection} from '../database';
import {IRequest} from '../interfaces/';

export const getMaritalStatuss = async(req:IRequest,res:Response,next:NextFunction):Promise<Response | void> => {
	
	try{
		
		const conn = await getConnection(req.user.bd);
	
	    const [results] = await conn.query('select * from estado_civil');
		
		const rows = JSON.parse(JSON.stringify(results));
		
		req.maritalStatuss=rows;
		
		return  next();
		
	}catch(e){
		
		return res.status(500).send(e.message);
	}

}


export const getMaritalStatus = async(req:IRequest,res:Response,next:NextFunction):Promise<Response | void> => {
	
	const {id} = req.params;
	
	try{
		
		const conn = await getConnection(req.user.bd);
	
	    const [results] = await conn.query('select * from estado_civil where id=?',[id]);
		
		const rows = JSON.parse(JSON.stringify(results));
		
		if(rows.length > 0){
			
			req.maritalStatus = rows[0];
			
			return next();
		}
		
		req.flash('msgWarning','No existe el estado civil');
		
		return res.redirect('/estado-civil');
		
	}catch(e){
		
		return res.status(500).send(e.message);
	}
	
}