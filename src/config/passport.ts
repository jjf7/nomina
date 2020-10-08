import passport from 'passport';
import {Strategy}  from 'passport-local';
import {getConnection} from '../database';
import {Request} from 'express';
import bcrypt from 'bcrypt';
import {IUser} from '../interfaces/';

async function authenticateUser(req:Request,email:string,password:string,done:Function): Promise<Function> {
	
	try{
		
		const BD = req.body.codigo;
		
		const conn = await getConnection(BD);
		
		const [result] = await conn.query("SELECT * from users where email = ?",[email]);
		
		const userR = JSON.parse(JSON.stringify(result));
		
		if(userR.length > 0){
			
			// compare password
			
			if(await bcrypt.compare(password, userR[0].password))
			{
				
				const user:IUser = userR[0];
				
				user.bd = BD;
				
				conn.end();
				
				return done(null,user, req.flash('msgSuccess','Login success'));
			}
			return done(null,false,'Incorrect Password.');
		}
		
		return done(null,false,req.flash('msgWarning','Email not match...'));
		
	}catch(e){
		
		return done(null,false, req.flash('msgDanger',"Error interno. comunicarse con soporte"));
		
	}
	
}

passport.use(
	new Strategy(
	{
		usernameField:'email',
		passReqToCallback : true
	}, authenticateUser)

);

passport.serializeUser( (user:IUser,done) => {
	done(null,user);
});

passport.deserializeUser( async(u:IUser,done)  => {
	
	try{
		
		const conn = await getConnection(u.bd);
		
		const [result] = await conn.execute("SELECT * from users where id = ?",[u.id]);
		
		const users = JSON.parse(JSON.stringify(result));
		
	    const user:IUser = users[0];
					
		user.bd = u.bd;
					 
		done(null,user);
		
		conn.end();
		
	}catch(e){
		
		done(null,e.message);
		
	}
		
			
});	
	






