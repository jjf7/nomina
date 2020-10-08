import { Request, Response } from 'express';
import {getConnection} from '../database';
import {IRequest} from '../interfaces/';
const { validationResult } = require('express-validator');
 
export const CargoApiId = (req:IRequest,res:Response) => {
	
	res.json(req.position);
	
}

export const CargoApi = (req:IRequest,res:Response) => {
	
	res.json(req.positions);
	
}

export const postPosition =  async (req:IRequest,res:Response) => {

const errors = validationResult(req);
  if (!errors.isEmpty()) {
	errors.array().forEach((e:any)  => { req.flash('msgWarning',`Error ${e.msg} para ${e.param}`) } );
	return res.status(422).redirect('/cargos/nuevo');
  }
	
	
	try{
		
		const {nombre,sueldo,sueldovar,descripcion} = req.body;
		
		const conn = await getConnection(req.user.bd);
	 
	    await conn.query("insert into cargos (nombre,sueldo,sueldovar,descripcion) values(?,?,?,?)",[nombre,sueldo,sueldovar,descripcion]);
		
		req.flash('msgSuccess','Guardado satisfactoriamente el nuevo cargo');
		
		res.status(201).redirect('/cargos');
		
		
	}catch(e){
		
		req.flash('msgDanger',e.message);
		res.status(500).redirect('/cargos/nuevo');
		
	}

	
}


export const putPosition = async(req:IRequest,res:Response) => {
	
const errors = validationResult(req);
  if (!errors.isEmpty()) {
	errors.array().forEach((e:any)  => { req.flash('msgWarning',`Error ${e.msg} para ${e.param}`) } );
	return res.status(422).redirect('/cargos/nuevo');
  }
  
  try{
		const {id} = req.params;
		
		const {nombre,sueldo,sueldovar,descripcion} = req.body;
		
		const conn = await getConnection(req.user.bd);
	 
await conn.query("update cargos set nombre=?, sueldo=?,sueldovar=?,descripcion=? where id=?",[nombre,sueldo,sueldovar,descripcion,id]);
		
		req.flash('msgSuccess','Editado satisfactoriamente el cargo');
		
		res.status(201).redirect('/cargos');
		
		
	}catch(e){
		
		req.flash('msgDanger',e.message);
		res.status(500).redirect('/cargos/nuevo');
		
	}
  
	
};


export const editFormPositionRender = (req:IRequest,res:Response) => {
	
	res.render("editFormPositionHTML", {cargo:req.position});
	
}

export const getPositionRender  = (req:IRequest,res:Response) => {
	
	res.render("listPositionHTML",{results:req.positions});
	
};

export const newFormPositionRender = (req:Request,res:Response)=>{
	res.render("newFormPositionHTML");
}




