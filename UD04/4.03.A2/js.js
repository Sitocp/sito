var pieza1 = null;
var pieza2 = null;
var pieza3 = null;
var pieza4 = null;

window.addEventListener('load', function(){

    //Declaramos las piezas(imagenes)
    pieza1 = $('#pieza1');
    pieza2 = $('#pieza2');
    pieza3 = $('#pieza3');
    pieza4 = $('#pieza4');

    //Permitimos que sean dragables
    window.addEventListener('dragover', function(ev){ev.preventDefault();});
    this.window.addEventListener('dragstart', function(ev){ev.dataTransfer.setData("text", ev.target.id);});

    //Cuando se dropee le damos funcionalidad dependiendo de donde caiga
    window.addEventListener('drop', function(ev){
        ev.preventDefault();

        var idT = ev.target.id; //El id de donde se va a droppear

        if(idT == 'pos1' || idT == 'pos2' || idT == 'pos3' || idT == 'pos4'){ //EN caso de que sean los contenedores
            ev.target.appendChild( ev.target.appendChild(document.getElementById(ev.dataTransfer.getData('text'))) );

            //Comprobamos si ha ganado
            CheckWin();
        }
        else if(idT == 'ini1' || idT == 'ini2' || idT == 'ini3' || idT == 'ini4'){ //En caso de que sean los contenedores iniciales
            ev.target.appendChild( ev.target.appendChild(document.getElementById(ev.dataTransfer.getData('text'))) );
        }

    });

});

function CheckWin(){
    console.log(pieza1.parent().attr('id'));
    console.log($('#pos1'));
    if(pieza1.parent().attr('id') == 'pos1' && pieza2.parent().attr('id') == 'pos2' && pieza3.parent().attr('id') == 'pos3' && pieza4.parent().attr('id') == 'pos4'){

        alert("Ganaste!");
    }
}
