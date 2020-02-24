var lienzo=null, canvas=null;

//VARIABLE DE COLISION
var colision = false;
var level = 1;
var obstaculos = [];

var letreroLevel = null;

var x=50,y=50;
var lastPress=null; //Variable para guardar la tecla presionada
//En nuestro juego, usaremos las teclas izquierda, arriba, derecha y abajo, cuyos valores numéricos son 37, 38, 39 y 40 respectivamente.
const KEY_LEFT=37;
const KEY_UP=38;
const KEY_RIGHT=39;
const KEY_DOWN=40;
const KEY_P=80;

function iniciar(){
    letreroLevel = document.getElementById("level");
    letreroLevel.innerHTML = 'Level ' + level;

    canvas=document.getElementById('lienzo');
    lienzo=canvas.getContext('2d'); //obtenemos el contexto de dibujo
    CreaObstaculos();
    run();
}
function run(){
    //requestAnimationFrame(): informa al navegador de que quieres realizar una animación y solicita que el navegador programe el repintado de la ventana para el próximo ciclo de animación.
    requestAnimationFrame(run); //animación optimizada
    accionesJuego();
    pintarLienzo(lienzo);
}

function accionesJuego(){
    //Modificamos la dirección que tendrá nuestro player en función de la tecla presionada   
        if(lastPress==KEY_RIGHT)
            x+=5;

        if(lastPress==KEY_LEFT)
            x-=5;
        
        if(lastPress==KEY_DOWN)
            y+=5;

        if(lastPress==KEY_UP)
            y-=5;

        if(lastPress==KEY_P){
        
        }
        
           
    //verificaremos si el player ha salido del canvas, en cuyo caso, haremos que aparezca por el otro lado:
    if(x>=canvas.width-20){
        NextLevel();
    }

    if(x<10){
        colision=true;
        x=10;x=x;
    }

    if(y>=canvas.height-20){
        colision=true;
        y=canvas.height-20;y=y;
    }
    
    if(y<10){
        colision=true;
        y=10;y=y;
    }

    //Verificamos si ha colisionado con los objetos
    obstaculos.forEach(obstaculo => {

        if(
            (function(){
            return!(
            obstaculo[0]>x+obstaculo[2] || 
            obstaculo[0]+obstaculo[2]<x || 
            obstaculo[1]>y+10 || 
            obstaculo[1]+obstaculo[3]<y)})() )
        {
            colision=true;
            x=obstaculo[0]; y=obstaculo[1];    
        }
        
        
    });
        
}

function pintarLienzo(lienzo){
    lienzo.fillStyle="#F7F9FA"; //le ponemos un color al lienzo
    lienzo.fillRect(0,0,canvas.width,canvas.height); //Dibujamos el lienzo
    lienzo.fillStyle='#0f0';
    lienzo.fillRect(x,y,10,10); //Dibujamos el jugador: va por posición x,y y es de 10x10    
    
    pintaBordes(lienzo);
    pintaObstaculos(lienzo);

    //PAUSE
    if(lastPress == KEY_P){
        lienzo.font = "30px Arial";
        lienzo.strokeText("PAUSE", 30, 30);
    }

    //COLISION
    if(colision){
        lienzo.font = "50px Arial";
        lienzo.strokeText("GAME OVER", 50, 50);
    }
}

function CreaObstaculos(){
    obstaculos = [];
    var width; 
    var height;

    var numObstaculos = 10 + (Math.floor(level*1.3));

    for (let i = 0; i < numObstaculos; i++) {
        do{
            width = Math.floor(Math.random() * 501);  
            height = Math.floor(Math.random() * 401); 
        }while(width<150); 

        obstaculos.push([width,height,10,50]);
    }
}

function pintaObstaculos(lienzo){
    obstaculos.forEach(obstaculo => {
        lienzo.fillStyle = 'red';
        lienzo.fillRect(obstaculo[0],obstaculo[1],obstaculo[2],obstaculo[3]);
    });
}

function pintaBordes(lienzo){
    lienzo.fillStyle = 'red';
    lienzo.fillRect(0,0,canvas.width,10); //ARRIBA
    lienzo.fillStyle = 'red';
    lienzo.fillRect(0,canvas.height-10,canvas.width,10); //ABAJO
    lienzo.fillStyle = 'red';
    lienzo.fillRect(0,0,10,canvas.height); //IZQUIERDA
    lienzo.fillStyle = 'purple';
    lienzo.fillRect(canvas.width-10,0,10,canvas.height); //DERECHA
}

function NextLevel(){

    //Reseteamos la posicion del cuadrado verde
    x=50;
    y=50;

    //Cambiamos de level
    level++;
    letreroLevel.innerHTML = 'Level ' + level;

    //Creamos obstaculos nuevos
    CreaObstaculos();
}

function GameOver(){
    document.removeEventListener('keydown', EventoTeclado);
}

function EventoTeclado(evt){
    //Creamos un manejador de evento para el teclado que se encargue de almacenar la tecla presionada. El evento que nos interesa en este caso es keydown
    if(!colision){
        lastPress=evt.keyCode;
    }
    else{
        if(evt.keyCode == 82){
            colision = false;
            level = 1;
            x=50;y=50;
            letreroLevel.innerHTML = 'Level ' + level;

            CreaObstaculos();
        }
    }
        
}

document.addEventListener('keydown', EventoTeclado, false);
window.addEventListener("load", iniciar, false);