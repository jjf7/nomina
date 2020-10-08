import {Request,Response,NextFunction} from 'express';
import {getConnection} from '../database';
import {IRequest} from '../interfaces'


export const getAllUsers = (req:IRequest,res:Response,next:NextFunction) => {
	
	getConnection(req.user.bd)
				.then( conn => conn.query('select * from users') )
				
				.then( ([users]) => { req.allUsers = JSON.parse(JSON.stringify(users)); next();})
				 
				.catch( e =>{ console.log(e);})	
				 
	
}