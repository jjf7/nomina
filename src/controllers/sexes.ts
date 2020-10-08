import { Request, Response } from 'express';
import {getConnection} from '../database';
import {IRequest} from '../interfaces/';
const { validationResult } = require('express-validator');
 

export const sexApi = (req:IRequest,res:Response) => {
	
	res.json(req.sexes);
	
}

export const postSexes =  async (req:IRequest,res:Response) => {

const errors = validationResult(req);
  if (!errors.isEmpty()) {
	errors.array().forEach((e:any)  => { req.flash('msgWarning',`Error ${e.msg} para ${e.param}`) } );
	return res.status(422).redirect('/sexo/nuevo');
  }
	
	
	try{
		
		const {nombre} = req.body;
		
		const conn = await getConnection(req.user.bd);
	 
	    await conn.query("insert into sexo (nombre) values(?)",[nombre]);
		
		req.flash('msgSuccess','Guardado satisfactoriamente el nuevo sexo');
		
		res.status(201).redirect('/sexo');
		
		
	}catch(e){
		
		req.flash('msgDanger',e.message);
		res.status(500).redirect('/sexo/nuevo');
		
	}

	
}


export const putSexes = async(req:IRequest,res:Response) => {
	
const errors = validationResult(req);
  if (!errors.isEmpty()) {
	errors.array().forEach((e:any)  => { req.flash('msgWarning',`Error ${e.msg} para ${e.param}`) } );
	return res.status(422).redirect('/sexo/nuevo');
  }
  
  try{
		const {id} = req.params;
		
		const {nombre,sueldo,sueldovar,descripcion} = req.body;
		
		const conn = await getConnection(req.user.bd);
	 
await conn.query("update sexo set nombre=? where id=?",[nombre,id]);
		
		req.flash('msgSuccess','Editado satisfactoriamente el sexo');
		
		 res.status(201).redirect('/sexo');
		
		
	}catch(e){
		
		req.flash('msgDanger',e.message);
		 res.status(500).redirect('/sexo/nuevo');
		
	}
  
	
};


export const getSexesRender = (req:IRequest,res:Response) => {
	
	res.render("listSexesHTML", {results:req.sexes});
	
}

export const editFormSexesRender = (req:IRequest,res:Response) => {
	
	res.render("editFormSexesHTML",{sexo:req.sex});
	
};

export const newFormSexesRender = (req:Request,res:Response)=>{
	res.render("newFormSexesHTML");
}




