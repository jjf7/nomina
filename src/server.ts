import express, {Application,Request,Response,NextFunction} from 'express';
import morgan from 'morgan';
import exphbs from 'express-handlebars';
import path from 'path';
import session from 'express-session';
import flash from 'connect-flash';
import passport from 'passport';
import methodOverride from 'method-override';
import {IRequest} from './interfaces'
import {getConnection} from './database'
import {authenticate,authRole} from './middlewares/authenticate';

import {helpersFunctions} from './helpers';
import  './config/passport';

// Routes Imports
import authRoutes from './routes/authRoutes'
import positionRoutes from './routes/positionRoutes'
import payrollTypesRoutes from './routes/payrollTypesRoutes'
import departmentsRoutes from './routes/departmentsRoutes'
import sexesRoutes from './routes/sexesRoutes'
import bloodTypeRoutes from './routes/bloodTypeRoutes'
import maritalStatusRoutes from './routes/maritalStatusRoutes'
import users from './routes/users'
import employeesRoutes from './routes/employees'

// Controllers
import {indexController} from './controllers/index.controller';

// Initialization

const app:Application = express();

// Settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname,'views'));

app.engine('.hbs', exphbs({
	defaultLayout: 'main',
	layoutsDir: path.join(app.get('views'),'layouts'),
	partialsDir:path.join(app.get('views'),'partials'),
	extname:'.hbs',
	helpers: helpersFunctions
}));

app.set('view engine', '.hbs');


// Middlewares

app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(flash());
app.use(methodOverride('_method'));

app.use(session({
	secret:`${process.env.SECRET_EXPRESS_SESSION}`,
	resave:false,
	saveUninitialized:false
}));

app.use(passport.initialize());
app.use(passport.session());


// Globals variables

app.use((req:express.Request, res:express.Response, next:NextFunction) => {
	
	res.locals.msgSuccess = req.flash('msgSuccess');
	res.locals.msgDanger = req.flash('msgDanger');
	res.locals.msgWarning = req.flash('msgWarning');
	res.locals.error = req.flash('error');
	res.locals.user = req.user || null;
	next();
});


app.use( async(req:IRequest,res:Response,next:NextFunction): Promise<Response | void> => {
	
	try{
		
		if(!req.user)
		{
			return next();	
			
		}else{
			
			const conn = await getConnection(req.user.bd);
	
			const [results] = await conn.query('SELECT P.*, PU.*, PD.* from permisos as P join permisos_usuarios as PU on P.id=PU.id_permiso join permisos_usuarios_do as PD on PD.id_permisos_usuarios = PU.id');
			
			const rows = JSON.parse(JSON.stringify(results));
			
			req.permissionsApp = rows;
			
			conn.end();
			
			return next();
			
		}
		
		
	}catch(e){
		return res.status(500).send(e.message);
	}

})


// Routes

app.use(users);
app.use(authRoutes);
app.use(positionRoutes);
app.use(payrollTypesRoutes);
app.use(departmentsRoutes);
app.use(sexesRoutes);
app.use(bloodTypeRoutes);
app.use(maritalStatusRoutes);
app.use(employeesRoutes);


// Static files

app.use('/public',express.static(path.join(__dirname,'public')));

export default app;