$(document).ready(function(){
	'use strict';
	//validación del formulario
  $('#Formulario').validate({
		rules:
		{
			nombre: {required : true, minlength: 3},
			apellidos: {required : true, minlength: 3},
			telefono:{required : true,minlength: 9,maxlength: 9,digits: true},
			email:{required : true,email:true,minlength: 4},
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
			//no pongo nada usuario por que ya se controla en email.
			contrasena:{required : true},
			contrasenarepe:{equalTo: '#contrasena'}

		},
		messages:
		{
			nombre : {required : 'debe rellenarme' ,minlength: 'mas largo porfavor'},
			apellidos : {required : 'debe rellenarme' ,minlength: 'mas largo porfavor'},
			telefono: {required: 'debe rellenarme',minlength: 'complete hasta 9 digitos sin espacios ni simbolos',maxlength:  'solo 9 digitos sin espacios ni simbolos',digits:'solo numeros'},
			email:{required : 'debe rellenarme',email:'inserte un mail valido',minlength: 'minimo 4 digitos'},
			repetiremail:{equalTo:'tiene que coincidir'},
			publicidad:{},
			conocer:{},
			demandante:{required : 'debe rellenarme'},
			cifinifi:{required : 'debe rellenarme'},
			empresa:{required : 'debe rellenarme'},
			direccion:{required : 'debe rellenarme'},
			cp:{required : 'debe rellenarme', maxlength: 'codigo postal son 5 dígitos'},
			localidad:{required : 'debe rellenarme'},
			provincia:{required : 'debe rellenarme'},
			pais:{required : 'debe rellenarme'},
			iban:{required : 'debe rellenarme'},
			pago:{required : 'debe rellenarme'},
			usuario:{required : 'debe rellenarme'},
			contrasena:{required : 'debe rellenarme'},
			contrasenarepe:{equalTo: 'tiene que coincidir'}
		},
		submitHandler: function() 
		{
	         //var cuota = $('input[name=r_payment]:checked', '#validForm').val();
	         //var r = confirm('¿Aceptas el pago de la primera cuota,€?');// ' + cuota + '
	         // if (r == true) 
	             alert('Así que vas a pagar... Formulario enviado!');
        }

	});
	// Si el Código Postal es mas cortito añade ceros
    $('#cp').focusout(function() {
        var caracteres = $('#cp').val();
        if (caracteres.length === 4)
            {$('#cp').val('0' + caracteres);}
        if (caracteres.length === 3)
            {$('#cp').val('00' + caracteres);}
        if (caracteres.length === 2)
            {$('#cp').val('000' + caracteres);}
        if (caracteres.length === 1)
            {$('#cp').val('0000' + caracteres);}
    });

    // auto rellenado de --- facturación -> tercer campo (nombre o empresa)
    $('#apellido').focusout(function() {
        var cliente = $('#nombre').val();
        if (cliente.length !== 0)
            {$('#empresa').val($('#nombre').val() + ' ' + $('#apellido').val());}
        else
        	{$('#empresa').val($('#apellido').val());}
    });
    // auto rellenado de --- datos acceso web -> nombre de usuario
    $('#email').focusout(function() {
        $('#usuario').val($('#email').val());
    });
    //lo defino par aambos de manera que si se cmabia cualquiera de los 2, reaccione
    $('#nombre').focusout(function() {
        var cliente = $('#nombre').val();
        if (cliente.length !== 0)
            {$('#empresa').val($('#nombre').val() + ' ' + $('#apellido').val());}
        else
        	{$('#empresa').val($('#apellido').val());}
    });

    // Si cambiamos datos de particular o empresa para facturar....
     $('#demandante').change(function(){
   
     	if ($('input:radio[name=demandante]:checked').val() ==='empresas')
     	{
     		$('#denominadoEmpresa').text('Empresa:');
     	} 
     	if ($('input:radio[name=demandante]:checked').val() ==='particular')
     	{
     		$('#denominadoEmpresa').text('Persona:');
     	} 

	});
     $('#contrasena').valid();

});