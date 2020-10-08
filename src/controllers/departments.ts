import { Request, Response } from 'express';
import {getConnection} from '../database';
import {IRequest} from '../interfaces/';
const { validationResult } = require('express-validator');

export const departamentoApi = (req:IRequest,res:Response) => {
	
	res.json(req.departments);
	
}


export const postDepartments =  async (req:IRequest,res:Response) => {

const errors = validationResult(req);
  if (!errors.isEmpty()) {
	errors.array().forEach((e:any)  => { req.flash('msgWarning',`Error ${e.msg} para ${e.param}`) } );
	return res.status(422).redirect('/departamentos/nuevo');
  }
	
	
	try{
		
		const {nombre,sueldo,sueldovar,descripcion} = req.body;
		
		const conn = await getConnection(req.user.bd);
	 
	    await conn.query("insert into departamentos (nombre) values(?)",[nombre]);
		
		req.flash('msgSuccess','Guardado satisfactoriamente el nuevo Departamento');
		
		res.status(201).redirect('/departamentos');
		
		
	}catch(e){
		
		req.flash('msgDanger',e.message);
		res.status(500).redirect('/Departamentos/nuevo');
		
	}

	
}


export const putDepartments = async(req:IRequest,res:Response) => {
	
const errors = validationResult(req);
  if (!errors.isEmpty()) {
	errors.array().forEach((e:any)  => { req.flash('msgWarning',`Error ${e.msg} para ${e.param}`) } );
	return res.status(422).redirect('/departamentos/nuevo');
  }
  
  try{
		const {id} = req.params;
		
		const {nombre,sueldo,sueldovar,descripcion} = req.body;
		
		const conn = await getConnection(req.user.bd);
	 
await conn.query("update departamentos set nombre=?  where id=?",[nombre,id]);
		
		req.flash('msgSuccess','Editado satisfactoriamente el Departamento');
		
		res.status(201).redirect('/departamentos');
		
		
	}catch(e){
		
		req.flash('msgDanger',e.message);
		res.status(500).redirect('/departamentos/nuevo');
		
	}
  
	
};


export const editFormDepartmentsRender = (req:IRequest,res:Response) => {
	
	res.render("editFormDepartmentsHTML", {departamento:req.department});
	
}

export const getDepartmentsRender = (req:IRequest,res:Response) => {
	
	res.render("listDepartmentsHTML",{results:req.departments});
	
};

export const newFormDepartmentsRender = (req:Request,res:Response)=>{
	res.render("newFormDepartmentsHTML");
}




