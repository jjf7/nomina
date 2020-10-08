import {createPool, Pool} from 'mysql2/promise';

export async function getConnection(nameDB:string | undefined):Promise<Pool> {
	
	const conex = await createPool({
		
		host:process.env.HOST_LOCAL,
		user:process.env.USER_LOCAL,
		password:process.env.PASSWORD_LOCAL,
        database:`${process.env.PREFIJO_APP}${nameDB}`,
		connectionLimit:10
		
	});
    
	return conex;
}