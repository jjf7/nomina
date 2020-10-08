import { Request, Response } from 'express';
import {getConnection} from '../database';
import {IEmployee} from '../interfaces/';
const { validationResult } = require('express-validator');

export const newFormEmployeeRender = (req:Request,res:Response)=>{
	res.render("newFormEmployeeHTML");
}

export const getEmployeesRender = (req:Request,res:Response)=>{
	res.send("Empleados ... En construccion");
}

export const postEmployees = (req:Request,res:Response)=>{
	res.send("POST RECEIVED");
}



