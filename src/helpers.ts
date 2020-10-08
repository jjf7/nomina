interface IHelpersFunction{
	UpperCase(cadena:string):string;
    completeDate():string,
    actualDate():any
}


//export const helpersFunctions:IHelpersFunction = { UpperCase(){} } ;
export const helpersFunctions = <IHelpersFunction>{};

helpersFunctions.actualDate = ()=>{
    
    var event = new Date();
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    
    return event.toLocaleString('es-ES', options);
}

helpersFunctions.UpperCase=(cadena) => {
	
	return cadena.replace(/\b\w/g, l => l.toUpperCase());
	
}

helpersFunctions.completeDate = () => {
	var oDate = new Date();
    var nHrs = oDate.getHours();
    var nMin = oDate.getMinutes();
    var nDate = (oDate.getDate() < 10) ? `0${oDate.getDate()}` : oDate.getDate();
    var nMnth = (oDate.getMonth()+1 < 10) ? `0${oDate.getMonth()+1}` :  oDate.getMonth()+1 ;
    var nYear = oDate.getFullYear();

    return nDate + '/' + nMnth + '/' + nYear;
  
}

 