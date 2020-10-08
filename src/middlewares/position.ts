import {Request,Response,NextFunction} from 'express';
import {getConnection} from '../database';
import {IRequest} from '../interfaces/';


export const getPositions = async(req:IRequest,res:Response,next:NextFunction):Promise<Response | void> => {
	
	try{
		
		const conn = await getConnection(req.user.bd);
	
	    const [results] = await conn.query('select * from cargos');
		
		const rows = JSON.parse(JSON.stringify(results));
		
		req.positions=rows;
		
		return  next();
		
	}catch(e){
		
		return res.status(500).send(e.message);
	}

}


export const getPosition = async(req:IRequest,res:Response,next:NextFunction):Promise<Response | void> => {
	
	const {id} = req.params;
	
	try{
		
		const conn = await getConnection(req.user.bd);
	
	    const [results] = await conn.query('select * from cargos where id=?',[id]);
		
		const rows = JSON.parse(JSON.stringify(results));
		
		if(rows.length > 0){
			
			req.position = rows[0];
			
			return next();
		}
		
		req.flash('msgWarning','No existe el cargo');
		
		return res.redirect('/cargos');
		
	}catch(e){
		
		return res.status(500).send(e.message);
	}
	
}