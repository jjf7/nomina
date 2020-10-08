 
async function main(){


	if(document.getElementById('sex')){
	const resultSex = await fetch('/sexApi');

	const rows = await resultSex.json();

	var sexInfo = `<option value=''>Seleccione</option>`;

	rows.forEach( i => {sexInfo+=`<option value="${i.id}">${i.nombre}</option>`;});

	document.getElementById('sex').innerHTML = sexInfo;
	}

	// Grupo sanguineo
	if(document.getElementById('grupo_sanguineo')){
	const resultGS = await fetch('/GSApi');

	const rowsGS = await resultGS.json();

	var GSInfo = `<option value=''>Seleccione</option>`;

	rowsGS.forEach( i => {GSInfo+=`<option value="${i.id}">${i.nombre}</option>`;});

	document.getElementById('grupo_sanguineo').innerHTML = GSInfo;
	}
	// Estado Civil
	if(document.getElementById('grupo_sanguineo')){
	const resultEC = await fetch('/ECApi');

	const rowsEC = await resultEC.json();

	var ECInfo = `<option value=''>Seleccione</option>`;

	rowsEC.forEach( i => {ECInfo+=`<option value="${i.id}">${i.nombre}</option>`;});

	document.getElementById('estado_civil').innerHTML = ECInfo;
	
}
	// Cargo
	if(document.getElementById('cargo')){
	const resultCargos = await fetch('/CargoApi');

	const rowsCargos = await resultCargos.json();

	var CargosInfo = `<option value=''>Seleccione</option>`;

	rowsCargos.forEach( i => {CargosInfo+=`<option value="${i.id}">${i.nombre}</option>`;});

	document.getElementById('cargo').innerHTML = CargosInfo;
	}
	// Tipo_nomina
	if(document.getElementById('tipo_nomina')){
	const resultTipo_nomina = await fetch('/Tipo_nominaApi');

	const rowsTipo_nomina = await resultTipo_nomina.json();

	var Tipo_nominaInfo = `<option value=''>Seleccione</option>`;

	rowsTipo_nomina.forEach( i => {Tipo_nominaInfo+=`<option value="${i.id}">${i.nombre}</option>`;});

	document.getElementById('tipo_nomina').innerHTML = Tipo_nominaInfo;
	}
	
	// departamento
	if(document.getElementById('departamento')){
	const resultDepartamento = await fetch('/departamentoApi');

	const rowsDepartamento = await resultDepartamento.json();

	var departamentoInfo = `<option value=''>Seleccione</option>`;

	rowsDepartamento.forEach( i => {departamentoInfo+=`<option value="${i.id}">${i.nombre}</option>`;});

	document.getElementById('departamento').innerHTML = departamentoInfo;

	}

	// sueldo

	const cargo = document.getElementById('cargo');

	if(cargo){
		cargo.addEventListener('change', async ()=>{

				const result = await  fetch('/CargoApi?id='+document.getElementById('cargo').value);

				const data = await result.json();

				console.log(data)

				document.getElementById('sueldo').value = data[0].sueldo;

		})
	}


	







	
	const bitcoinApi = await fetch('https://api.coindesk.com/v1/bpi/currentprice.json');
	
	const bitcoinValue = await bitcoinApi.json();
	
	const bitcoin = bitcoinValue.bpi.USD.rate.split(".");
	
	document.getElementById('bitcoinvalue').innerText=bitcoin[0].replace(/,/g,'.');
	
	
const permissions = document.getElementById('permissions');	

if(permissions){

var id = document.getElementById('id').value;

	
const results = await fetch('/permissions?id='+id,{
			method:'GET',
			headers: {'Contend-Type':'application/json'}
		});
		
	const rows = await results.json();
		
	var cadena =`<option value="" disabled selected>Choose your option</option>`;
	rows.permissions.forEach(  item => {  cadena+=`<option value="${item.id}">${item.permiso.replace(/\b\w/g, l => l.toUpperCase())}</option>`  }  )
	
	permissions.innerHTML=cadena;
	
	
//----------------
const results2=await fetch('/users/permissions?id='+id,{method:'GET',headers:{'Contend-Type':'application/json'}});
const rows2 = await results2.json();

const conn = await fetch('/users/permissions/doits?id='+id,{method:'GET',headers:{'Contend-Type':'application/json'}});
	 
const response = await conn.json();

 
const permissionsUsers = document.querySelector('#permissionsUsers');
				
permissionsUsers.innerHTML='Loading Data';	

var cadena2 = '';

rows2.permissionsUsers.forEach( (item) => {

cadena2+=`<tr>
					
					<td><span class="text-primary">${item.permiso.replace(/\b\w/g, l => l.toUpperCase())}</span>
							<div class="mx-auto">
							<form method="POST" action="/usuarios/permisos/${item.id_usuario}?_method=DELETE">
							    <input type="hidden" name="_method" value="DELETE">
							    <input type="hidden" name="id" value="${item.id}">
								<button class="submitDeletePermission" type="submit"><<</button>
							</form>
							</div>
					</td>
					<td>
							<table class="table table-striped table-bordered zero-configuration">
									<tr>
									  <td>Listar</td>
									  <td>Crear</td>
									  <td>Modificar</td>
									  <td>Eliminar</td>
									</tr>
								  <tr>
`;
				  
var checkedList = '';  var checkedAdd = '';  var checkedUpdate = '';  var checkedDelete = ''; 

response.resultDoits.forEach( items => {
	
	if(items.id_permisos_usuarios === item.id && items.doit==='get'){checkedList=`checked="checked"`;}
	if(items.id_permisos_usuarios === item.id && items.doit==='post'){checkedAdd=`checked="checked"`;}
	if(items.id_permisos_usuarios === item.id && items.doit==='put'){checkedUpdate=`checked="checked"`;}
	if(items.id_permisos_usuarios === item.id && items.doit==='delete'){checkedDelete=`checked="checked"`;}
	
})


cadena2+=`

<td><input ${checkedList} type="checkbox" id="get${item.id}" rel="${item.id}" value="get"></td>
<td><input ${checkedAdd} type="checkbox" id="post${item.id}" rel="${item.id}" value="post"></td>
<td><input ${checkedUpdate} type="checkbox" id="put${item.id}" rel="${item.id}" value="put"></td>
<td><input ${checkedDelete} type="checkbox" id="delete${item.id}" rel="${item.id}" value="delete"></td>`;
									  
									  
cadena2+=` </tr></table></td></tr>`;					  
									  

})			

permissionsUsers.innerHTML=cadena2;				
	
}// end if
	
	
		
	
}// end main

main();

$(document).on('click','input[type="checkbox"]',async(e) => {
	
	const element = e.target;
	
	//console.log($(element).attr('value'),$(element).attr('rel'))
	
			if(document.getElementById(`${$(element).attr('value')}${$(element).attr('rel')}`).checked){
                const data = {'id':$(element).attr('rel'),'doit':$(element).attr('value')};
			
			const result = await fetch('/users/permissions/add/permission',{
				method:'POST',
				body: JSON.stringify(data), 
				headers:{
							'Content-Type': 'application/json'
						}
			})
			//const rows = await result.json();
			console.log(result.status);
				if(result.status===500 || result.status===404 || result.status===403){
					
					$('#error').css('display','block');
					$('#error').html('No autorizado...');
					$(this).prop('checked', false);
					
				}else{
					
					$('#success').css('display','block');
					$('#success').html('Permiso añadido');
					
				}
            }
            else {
						const dataD =  {'id':$(element).attr('rel'),'doit':$(element).attr('value')};
						const resultD = await fetch('/users/permissions/delete/permission',{
							method:'DELETE',
							body: JSON.stringify(dataD), 
							headers:{
										'Content-Type': 'application/json'
									}
						})
						//const rowsD = await resultD.json();
						
						if(resultD.status===500 || resultD.status===404 ||  resultD.status===403){
							$('#error').css('display','block');
							$('#error').html('No autorizado...');
							
						}else{
							
							$('#success').css('display','block');
							$('#success').html('Permiso removido');
							
						}
					
						
            }
	
	
	
})





	

 