import {Request,Response,NextFunction} from 'express';
import {getConnection} from '../database';
import {IRequest} from '../interfaces/';

export const getBloodTypes = async(req:IRequest,res:Response,next:NextFunction):Promise<Response | void> => {
	
	try{
		
		const conn = await getConnection(req.user.bd);
	
	    const [results] = await conn.query('select * from grupo_sanguineo');
		
		const rows = JSON.parse(JSON.stringify(results));
		
		req.bloodTypes=rows;
		
		return  next();
		
	}catch(e){
		
		return res.status(500).send(e.message);
	}

}


export const getBloodType = async(req:IRequest,res:Response,next:NextFunction):Promise<Response | void> => {
	
	const {id} = req.params;
	
	try{
		
		const conn = await getConnection(req.user.bd);
	
	    const [results] = await conn.query('select * from grupo_sanguineo where id=?',[id]);
		
		const rows = JSON.parse(JSON.stringify(results));
		
		if(rows.length > 0){
			
			req.bloodType = rows[0];
			
			return next();
		}
		
		req.flash('msgWarning','No existe el grupo sanguineo');
		
		return res.redirect('/grupos-sanguineos');
		
	}catch(e){
		
		return res.status(500).send(e.message);
	}
	
}