//Variables para guardar los datos
var numAterrizajes = 0;
var numDespegados = 0;

//Los hacemos globales para que sean llamados desde funciones ajenas al evento de load
var contadorDespegados = null;
var contadorAterrizados = null;

window.addEventListener('load', function(){
    //Span para contadores
    contadorAterrizados = document.getElementById('contadorAterrizados');
    contadorDespegados = document.getElementById('contadorDepegados');

    //Fotos dragables
    var aterrizar = document.getElementById('aterriza');
    var despegar = document.getElementById('despega');
    var papelera = document.getElementById('papelera');

    //Permitimos que sean dragables
    window.addEventListener('dragover', function(ev){ev.preventDefault();});
    this.window.addEventListener('dragstart', function(ev){ev.dataTransfer.setData("text", ev.target.id);});

    //Cuando se dropee le damos funcionalidad dependiendo de donde caiga
    window.addEventListener('drop', function(ev){
        ev.preventDefault();

        //Miramos si el target es alguno de los que nos interesa
        if(ev.target == document.getElementById('divDespegados') && ev.dataTransfer.getData('text') == despegar.getAttribute('id')){
            numDespegados++;
            UpdateDespegados();
        }
        else if(ev.target == document.getElementById('papelera') && ev.dataTransfer.getData('text') == despegar.getAttribute('id')){
            if(numDespegados != 0){
                numDespegados--;
                UpdateDespegados();
            }                
        }
        else if(ev.target == document.getElementById('divAterrizados') && ev.dataTransfer.getData('text') == aterrizar.getAttribute('id')){
            numAterrizajes++;
            UpdateAterrizajes();
        }
        else if(ev.target == document.getElementById('papelera') && ev.dataTransfer.getData('text') == aterrizar.getAttribute('id')){
            if(numAterrizajes != 0){
                numAterrizajes--;
                UpdateAterrizajes();
            }                
        }
    });

});

function UpdateAterrizajes(){
    contadorAterrizados.innerHTML = numAterrizajes;
}
function UpdateDespegados(){
    contadorDespegados.innerHTML = numDespegados;
}