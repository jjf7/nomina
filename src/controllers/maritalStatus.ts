import { Request, Response } from 'express';
import {getConnection} from '../database';
import {IRequest} from '../interfaces/';
const { validationResult } = require('express-validator');
 

export const ECApi = (req:IRequest,res:Response) => {
	
	res.json(req.maritalStatuss);
	
}

export const postMaritalStatus =  async (req:IRequest,res:Response) => {

const errors = validationResult(req);
  if (!errors.isEmpty()) {
	errors.array().forEach((e:any)  => { req.flash('msgWarning',`Error ${e.msg} para ${e.param}`) } );
	return res.status(422).redirect('/estado-civil/nuevo');
  }
	
	
	try{
		
		const {nombre} = req.body;
		
		const conn = await getConnection(req.user.bd);
	 
	    await conn.query("insert into estado_civil(nombre) values(?)",[nombre]);
		
		req.flash('msgSuccess','Guardado satisfactoriamente el nuevo grupo sanguineo');
		
		res.status(201).redirect('/estado-civil');
		
		
	}catch(e){
		
		req.flash('msgDanger',e.message);
		res.status(500).redirect('/estado-civil/nuevo');
		
	}

	
}


export const putMaritalStatus = async(req:IRequest,res:Response) => {
	
const errors = validationResult(req);
  if (!errors.isEmpty()) {
	errors.array().forEach((e:any)  => { req.flash('msgWarning',`Error ${e.msg} para ${e.param}`) } );
	return res.status(422).redirect('/estado-civil/nuevo');
  }
  
  try{
		const {id} = req.params;
		
		const {nombre} = req.body;
		
		const conn = await getConnection(req.user.bd);
	 
		await conn.query("update estado_civil set nombre=? where id=?",[nombre,id]);
		
		req.flash('msgSuccess','Editado satisfactoriamente el grupo sanguineo');
		
		res.status(201).redirect('/estado-civil');
		
		
	}catch(e){
		
		req.flash('msgDanger',e.message);
		res.status(500).redirect('/estado-civil/');
		
	}
  
	
};


export const editFormMaritalStatusRender = (req:IRequest,res:Response) => {
	
	res.render("editFormMaritalStatusHTML", {estado_civil:req.maritalStatus});
	
}

export const getMaritalStatusRender = (req:IRequest,res:Response) => {
	
	res.render("listMaritalStatusHTML",{results:req.maritalStatuss});
	
};

export const newFormMaritalStatusRender = (req:Request,res:Response)=>{
	res.render("newFormMaritalStatusHTML");
}




