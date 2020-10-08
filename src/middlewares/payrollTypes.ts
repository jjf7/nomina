import {Request,Response,NextFunction} from 'express';
import {getConnection} from '../database';
import {IRequest} from '../interfaces/';

export const getPayrollTypes = async(req:IRequest,res:Response,next:NextFunction):Promise<Response | void> => {
	
	try{
		
		const conn = await getConnection(req.user.bd);
	
	    const [results] = await conn.query('select * from tipos_nominas');
		
		const rows = JSON.parse(JSON.stringify(results));
		
		req.payrollTypes=rows;
		
		return  next();
		
	}catch(e){
		
		return res.status(500).send(e.message);
	}

}


export const getPayrollType = async(req:IRequest,res:Response,next:NextFunction):Promise<Response | void> => {
	
	const {id} = req.params;
	
	try{
		
		const conn = await getConnection(req.user.bd);
	
	    const [results] = await conn.query('select * from tipos_nominas where id=?',[id]);
		
		const rows = JSON.parse(JSON.stringify(results));
		
		if(rows.length > 0){
			
			req.payrollType = rows[0];
			
			return next();
		}
		
		req.flash('msgWarning','No existe el tipo de nomina');
		
		res.redirect('/tipos-nominas');
		
	}catch(e){
		
		return res.status(500).send(e.message);
	}
	
}