import { Request, Response } from 'express';
import {getConnection} from '../database';
import {IRequest} from '../interfaces/';
const { validationResult } = require('express-validator');
 

export const GSApi = (req:IRequest,res:Response) => {
	
	res.json(req.bloodTypes);
	
}

export const postBloodType =  async (req:IRequest,res:Response) => {

const errors = validationResult(req);
  if (!errors.isEmpty()) {
	errors.array().forEach((e:any)  => { req.flash('msgWarning',`Error ${e.msg} para ${e.param}`) } );
	return res.status(422).redirect('/grupos-sanguineos/nuevo');
  }
	
	
	try{
		
		const {nombre} = req.body;
		
		const conn = await getConnection(req.user.bd);
	 
	    await conn.query("insert into grupo_sanguineo(nombre) values(?)",[nombre]);
		
		req.flash('msgSuccess','Guardado satisfactoriamente el nuevo grupo sanguineo');
		
		res.status(201).redirect('/grupos-sanguineos');
		
		
	}catch(e){
		
		req.flash('msgDanger',e.message);
		res.status(500).redirect('/grupos-sanguineos/nuevo');
		
	}

	
}


export const putBloodType = async(req:IRequest,res:Response) => {
	
const errors = validationResult(req);
  if (!errors.isEmpty()) {
	errors.array().forEach((e:any)  => { req.flash('msgWarning',`Error ${e.msg} para ${e.param}`) } );
	return res.status(422).redirect('/grupos-sanguineos/nuevo');
  }
  
  try{
		const {id} = req.params;
		
		const {nombre,sueldo,sueldovar,descripcion} = req.body;
		
		const conn = await getConnection(req.user.bd);
	 
await conn.query("update grupo_sanguineo set nombre=? where id=?",[nombre,id]);
		
		req.flash('msgSuccess','Editado satisfactoriamente el grupo sanguineo');
		
		res.status(201).redirect('/grupos-sanguineos');
		
		
	}catch(e){
		
		req.flash('msgDanger',e.message);
		res.status(500).redirect('/grupos-sanguineos/nuevo');
		
	}
  
	
};


export const editFormBloodTypeRender = (req:IRequest,res:Response) => {
	
	res.render("editFormBloodTypeHTML", {grupo_sanguineo:req.bloodType});
	
}

export const getBloodTypesRender = (req:IRequest,res:Response) => {
	
	res.render("listBloodTypesHTML",{results:req.bloodTypes});
	
};

export const newFormBloodTypeRender = (req:Request,res:Response)=>{
	res.render("newFormBloodTypeHTML");
}




