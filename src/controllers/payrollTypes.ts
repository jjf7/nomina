import { Request, Response } from 'express';
import {getConnection} from '../database';
import {IRequest} from '../interfaces/';
const { validationResult } = require('express-validator');

export const Tipo_nominaApi = (req:IRequest,res:Response) => {
	
	res.json(req.payrollTypes);
	
}

export const postPayrollTypes =  async (req:IRequest,res:Response) => {

const errors = validationResult(req);

  if (!errors.isEmpty()) {
	errors.array().forEach((e:any)  => { req.flash('msgWarning',`Error ${e.msg} para ${e.param}`) } );
	return res.status(422).redirect('/tipos-nominas/nuevo');
  }
	
	
	try{
		
		const {nombre} = req.body;
		
		const conn = await getConnection(req.user.bd);
	 
	    await conn.query("insert into tipos_nominas (nombre) values(?)",[nombre]);
		
		req.flash('msgSuccess','Guardado satisfactoriamente');
		
		res.status(201).redirect('/tipos-nominas');
		
		
	}catch(e){
		
		req.flash('msgDanger',e.message);
		res.status(500).redirect('/tipos-nominas/nuevo');
		
	}

	
}


export const putPayrollTypes = async(req:IRequest,res:Response) => {
	
const errors = validationResult(req);
  if (!errors.isEmpty()) {
	errors.array().forEach((e:any)  => { req.flash('msgWarning',`Error ${e.msg} para ${e.param}`) } );
	return res.status(422).redirect('/tipos-nominas/nuevo');
  }
  
  try{
		const {id} = req.params;
		
		const {nombre,sueldo,sueldovar,descripcion} = req.body;
		
		const conn = await getConnection(req.user.bd);
	 
await conn.query("update tipos_nominas set nombre=? where id=?",[nombre,id]);
		
		req.flash('msgSuccess','Editado satisfactoriamente ');
		
		res.status(201).redirect('/tipos-nominas');
		
		
	}catch(e){
		
		req.flash('msgDanger',e.message);
		res.status(500).redirect('/tipos-nominas/nuevo');
		
	}
  
	
};


export const editFormPayrollTypesRender = (req:IRequest,res:Response) => {
	
	res.render("editFormPayrollTypesHTML", {tipoNomina:req.payrollType});
	
}

export const getPayrollTypesRender = (req:IRequest,res:Response) => {
	
	res.render("listPayrollTypesHTML",{results:req.payrollTypes});
	
};

export const newFormPayrollTypesRender = (req:Request,res:Response)=>{
	res.render("newFormPayrollTypesHTML");
}




