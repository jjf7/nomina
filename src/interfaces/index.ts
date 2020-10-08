import {Request} from 'express';

export interface IUser{
   id:number;
   email:string;
   password:string;
   created_at:string;
   bd:string;
  
}

export interface IEmployee extends Request{
	user?:any,
	employees:Array<{}>
}

export interface IRequest extends Request {
	user?:any,
	position?:{},
	positions?:Array<{}>,
	department?:{},
	departments?:Array<{}>,
	maritalStatus?:{},
	maritalStatuss?:Array<{}>,
	bloodType?:{},
	bloodTypes?:Array<{}>,
	sex?:{},
	sexes?:Array<{}>,
	payrollType?:{},
	payrollTypes?:Array<{}>,
	allUsers?:Array<{}>,
	permissionsTable?:Array<{}>,
	userDetail?:{},
	permissions?:Array<{}>
	permissionsUser?:Array<{}>
	doits?:Array<{}>,
	users?:Array<{}>,
	permissionsApp?:Array<{permiso?:string,id_usuario?:number,doit?:string}>
}
