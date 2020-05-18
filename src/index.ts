import dotenv  from 'dotenv';
dotenv.config();

import app from './server';

async function main(){
	
	await app.listen(app.get('port'));
	
	console.log(`Server on port ${app.get('port')}`);
	
}


main();