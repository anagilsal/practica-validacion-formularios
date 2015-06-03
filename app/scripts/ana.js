$(document).ready(function(){
	'use strict';
	//validación del formulario
  $('#Formulario').validate({
		rules:
		{
			nombre: {required : true, minlength: 3},
			apellidos: {required : true, minlength: 3},
			telefono:{required : true,minlength: 9,maxlength: 9,digits: true},
			email:{required : true,email:true},
			repetiremail:{equalTo: '#email'},
			publicidad:{},
			conocer:{},
			demandante:{required : true},
			cifinifi:{required : true},
			empresa:{required : true},
			direccion:{required : true},
			cp:{required : true, maxlength: 5},
			localidad:{required : true},
			provincia:{required : true},
			pais:{required : true},
			iban:{required : true},
			pago:{required : true},
			usuario:{required : true},
			contrasena:{required : true},
			contrasenarepe:{equalTo: '#contrasena'}

		},
		messages:
		{
			nombre : {required : 'debe rellenarme' ,minlength: 'mas largo porfavor'},
			apellidos : {required : 'debe rellenarme' ,minlength: 'mas largo porfavor'}
		}

	});
		
});





