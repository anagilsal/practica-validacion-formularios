 $(document).ready(function() {

     //Esta será la validación general del formulario
     $("#validForm").validate({
         //Reglas de validación
         rules: {
             //- Todos los campos con * son requeridos
             nombre:  {required: true},
             apellido: {required: true},
             telefono: {required: true,minlength: 9,maxlength: 9,digits: true},
             email: {required: true,minlength: 4,emailing: true, remote: "php/validar_email_db.php"},
             repetiremail: {required: true,equalTo: '#email'},
             cifnif: 
             {
                required: true,remote: "php/validar_nif_db.php",
              nifES: function() {
                     if ($("#particular").is(':checked')) {
                         return true;
                     }
                 },
              cifES: function() {
                     if ($("#empresas").is(':checked')) {
                         return true;
                     }
                }
            } ,
             empresa: {required: true},
             direccion: {required: true},
             postal_code: {required: true,digits: true,maxlength: 5},
             localidad: {required: true},
             provincia: {required: true},
             pais: {required: true},
             iban: {required: true, iban: true,maxlength: 24},
             pago: {required: true},
             //no pongo nada usuario por que ya se controla en email.
             contrasena: {required: true,compleja: true},
             contrasenarepe: {equalTo: '#contrasena'}
         },
         messages: {

            nombre:{required: 'debe rellenarme'},
            apellido:{required:'debe rellenarme'},
            telefono: {required:'debe rellenarme',minlength:'complete hasta 9 digitos sin espacios ni simbolos',maxlength:'solo 9 digitos sin espacios ni simbolos',digits:'solo numeros'},
            email:{required: 'debe rellenarme',emailing:'inserte un mail valido',minlength: 'minimo 4 digitos',remote:'ya existe'},
            repetiremail:{required: 'debe rellenarme',equalTo:'tiene que coincidir'},
            cifnif:{required: 'debe rellenarme', remote:'ya existe',nifES:'NIF incorrecto',cifES:'CIF incorrecto'},
            empresa:{required: 'debe rellenarme'},
            direccion:{required: 'debe rellenarme'},
            postal_code:{required: 'debe rellenarme', maxlength: 'son 5 dígitos',digits:'solo numeros'},
            localidad:{required: 'debe rellenarme'},
            provincia:{required: 'debe rellenarme'},
            pais:{required: 'debe seleccionar uno'},
            iban:{required: 'debe rellenarme',iban:'IBAN no válido',maxlength:'son 24 dígitos'},
            pago:{required: 'debe rellenarme'},
            contrasena:{required: 'debe rellenarme'},
            contrasenarepe:{equalTo: 'tiene que coincidir'}
         },
         errorPlacement: function(error, element) {
             error.insertAfter($("label[for='" + element.attr('name') + "']"));
         },
         //Captura el envío del formulario una vez que se ha rellenado correctamente
         // Una vez pulsemos enviar en el formulario se mostrará un aviso al usuario de 
         // que se va a dar de alta y que se le pasará la primera cuota de 50€, 140€ o 
         //550€ según corresponda(forma de pago).El usuario podrá cancelar la operación.
         submitHandler: function() {
            if ($("#pagomes").is(':checked')) {
                var r = confirm(" el pago de la primera cuota,corresponde a 50€, está conforme?");
            }
            if ($("#pagotrimestre").is(':checked')) {
                var r = confirm(" el pago de la primera cuota,corresponde a 140€, está conforme?");
            }
            if ($("#pagoanio").is(':checked')) {
                var r = confirm(" el pago de la primera cuota,corresponde a 550€, está conforme?");
            }
             
             if (r == true) {alert("Formulario enviado!:)");
             }
         }
     });
    $('#postal_code').focusout(function() {
        var caracteres = $('#postal_code').val();
        if (caracteres.length === 4)
            {$('#postal_code').val('0' + caracteres);}
        if (caracteres.length === 3)
            {$('#postal_code').val('00' + caracteres);}
        if (caracteres.length === 2)
            {$('#postal_code').val('000' + caracteres);}
        if (caracteres.length === 1)
            {$('#postal_code').val('0000' + caracteres);}
    });
    //autorellenado de provincia
             $('#postal_code').focusout(function() { //cuando cambiamos el código postal
                if ($(this).val() !== '') {
                    var dato = $(this).val();
                        dato = dato.substring(0, 2);
                    $('#provincia').val(dato);
                }
            });

    // Si el Código Postal es mas cortito añade ceros

      $("#postal_code").bind("change paste keyup", function(evento) {
         if ($(this).val().length >= 5) {
             var dato = $(this).val();
             //Completo de forma automática la localidad
             var promise = $.ajax({
                 type: "POST",
                 dataType: "json",
                 url: "php/getMunicipios.php",
                 data: {
                     cp: dato
                 }
             });

             //al terminar la promesa:
             promise.done(function(data) {
                 var sel = $("#localidad");
                 sel.empty();
                 for (var i = 0; i < data.length; i++) {
                     sel.append('<option value="' + data[i].idMunicipio + '">' + data[i].Municipio + '</option>');
                 }
             });
         }
     });


// auto rellenado de --- facturación -> tercer campo (nombre o empresa)
        $('#nombre').focusout(function() {
        $('#empresa').val($('#nombre').val() + ' ' +$('#apellido').val());
    });
    //lo defino par aambos de manera que si se cmabia cualquiera de los 2, reaccione
     $('#apellido').focusout(function() {
        $('#empresa').val($('#nombre').val() + ' ' +$('#apellido').val());
    });




 
    // auto rellenado de --- datos acceso web -> nombre de usuario
    $('#email').focusout(function() {
        $('#usuario').val($('#email').val());
    });


    $('#email').focusout(function() {
        $('#usuario').val($('#email').val());
    });



     // Si el input:radio #particular esta marcado:
     $("#particular").change(function(evento) {
         if ($("#particular").is(':checked')) {
             $("label[for='empresa']").first().html('Nombre');
             $("#empresa").val('');
             $("label[for='cifnif']").first().html('NIF ');
             $("#cifnif").val('');
         }
     });

     // Si el usuario selecciona como demandante Empresa, se borrará el contenido del campo“ Nombre”, que pasará a llamarse“ Empresa” para que el usuario lo rellene. 
     // Si el input:radio #particular esta marcado:
     $("#empresas").change(function(evento) {
         if ($("#empresas").is(':checked')) {
             $("label[for='empresa']").first().html('Empresa ');
             $("#empresa").val('');
             $("label[for='cifnif']").first().html('CIF ');
             $("#cifnif").val('');
         }
     });

     
     $('#pb').css({
         'background-image': 'none',
         'background-color': 'red'
     });



     $('#contrasena').complexify({
         strengthScaleFactor: 0.2
     }, function(valid, complexity) {
         if (complexity < 50) {
             $('#pbPassword').css({
                 'background-color': 'red'
             });
         } else if (complexity < 100) {
             $('#pbPassword').css({
                 'background-color': 'orange'
             });
         } else {
             $('#pbPassword').css({
                 'background-color': 'green'
             });
         }
         $('#pbPassword').css({
             'width': complexity + '%'
         }).attr('aria-valuenow', complexity);
         $("input[for='contrasena'][name='complexity']").val(complexity);
     });

     /*
      * Evita que se pueda cortar, copiar y pegar 
      */
     $('#contrasena').bind("cut copy paste", function(e) {e.preventDefault();});
     $('#contrasenarepe').bind("cut copy paste", function(e) { e.preventDefault(); });
     $('#repetiremail').bind("paste", function(e) { e.preventDefault();});
 });
