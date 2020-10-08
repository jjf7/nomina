import {Request,Response,NextFunction} from 'express';
import {getConnection} from '../database';
import {IRequest} from '../interfaces/';

export const getSexes = async(req:IRequest,res:Response,next:NextFunction):Promise<Response | void> => {
	
	try{
		
		const conn = await getConnection(req.user.bd);
	
	    const [results] = await conn.query('select * from sexo');
		
		const rows = JSON.parse(JSON.stringify(results));
		
		req.sexes=rows;
		
		return  next();
		
	}catch(e){
		
		return res.status(500).send(e.message);
	}

}


export const getSex = async(req:IRequest,res:Response,next:NextFunction):Promise<Response | void> => {
	
	const {id} = req.params;
	
	try{
		
		const conn = await getConnection(req.user.bd);
	
	    const [results] = await conn.query('select * from sexo where id=?',[id]);
		
		const rows = JSON.parse(JSON.stringify(results));
		
		if(rows.length > 0){
			
			req.sex = rows[0];
			
			return next();
		}
		
		req.flash('msgWarning','No existe el sexo');
		
		res.redirect('/sexo');
		
	}catch(e){
		
		return res.status(500).send(e.message);
	}
	
}