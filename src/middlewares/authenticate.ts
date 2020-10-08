import {Request, Response, NextFunction} from 'express';

export const authenticate = (req:Request, res:Response ,next:NextFunction ): Function | void => {
	if(req.isAuthenticated()){
		return next();
	}
	req.flash('msgWarning', 'No estas autorizado...');
	return res.redirect('/');
}


export const checkAuthenticate = (req:Request, res:Response ,next:NextFunction ): Function | void => {
	
	if(req.isAuthenticated()){
		return res.redirect('/');
	}
	
   return next();
 }
 
 
export function authRole(roles:string[]){	
	return(				
				(req:any,res:Response,next:Function) => {
					
					if(roles.find( role => { return  req.user.role==role   })) return next();
					
					req.flash('msgWarning','Unauthorized...');
					
					return res.redirect('/');					
				}	
	)	
}