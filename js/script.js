//variables globales
let gameOver = false;
let battleWiner;
let historyInfoDeg = 0;
let pokemonList = [];

let pokemonJugador;
let pokemonPC;
let pokemonPC2;
let pokemonPC3;


let optionPokemon1; 
let optionPokemon2; 
let optionPokemon3;

let intervalTimer;

//variables de seleccion de jugador
const containerSelPlayer = document.getElementById("tarjetContainer");

let pokemon1;
let pokemon2;
let pokemon3;

let cssPoke1;
let cssPoke2;
let cssPoke3;

//variables de Secciones
const sectionBatalla = document.getElementById("info_battle");
const sectionSelPokemon = document.getElementById("selec_player");
const sectionMapa = document.getElementById("mapa");
const sectionReset = document.getElementById("endgame");

//variables info battle
const spanPlayer = document.getElementById("spanplayer");
const spanPlayerVida = document.getElementById("player_vidas");
const spanPc = document.getElementById("spanpc");
const spanPcVida = document.getElementById("pc_vidas");

//var botones confirm
const btn_confirm = document.getElementById("confirm");
const btn_reset = document.getElementById("btn_reset");

//variables pokemon vidas
let vida_player = 3;
let vida_enemigo = 3;

//variables de ataques
const atk_1 = document.getElementById("atack_1"); 
const atk_2 = document.getElementById("atack_2"); 
const atk_3 = document.getElementById("atack_3"); 

let ataqueJugador = 0;
let ataquePc = 0;

//Variables section "combate"
const historial = document.getElementById("combate");
let parrafo;

//Variables del mundo abierto
let mapaTablero = document.getElementById("mapa_tablero");
    mapaTablero.width = 630;
    mapaTablero.height = 387;

let mapa = mapaTablero.getContext("2d");
let canvaBackground = new Image();
    canvaBackground.src = "http://drive.google.com/uc?export=view&id=1bs2Gp1hgBVsHOprhvGNL0cfBTXuDbjz1";

let canvaBackgroundFront = new Image();
    canvaBackgroundFront.src = "http://drive.google.com/uc?export=view&id=1bs2Gp1hgBVsHOprhvGNL0cfBTXuDbjz1";

//Clase para Pokemon
class Pokemon{
    constructor(name,img){
        this.img = img;
        this.name = name;
        this.ataques = [];
        this.cordX = 30;
        this.cordy = 30;
        this.width = 100;
        this.height = 100;
        this.canvas = new Image();
        this.canvas.src = img;
        this.velX = 0;
        this.velY = 0;
    }

    drawPokemon(){
        mapa.drawImage(
            this.canvas,
            this.cordX,
            this.cordy,
            this.width,
            this.height
        );
    }
}

//Objetos Pokemon
let poke_pikachu = new Pokemon("Pikachu","http://drive.google.com/uc?export=view&id=1Uk1tlgelpchcb-3_b8lVxUPeWa_wd4l4");
poke_pikachu.ataques.push(
    {name:"Impactrueno",id:"atack_1"},
    {name:"Ataque rápido",id:"atack_2"},
    {name:"Chispazo",id:"atack_3"},
    {name:"Puño trueno",id:"atack_4"}
);

let poke_combusken = new Pokemon("Combusken","http://drive.google.com/uc?export=view&id=1AeLeu1r0eJUS_XpstRRKs9NXN9cVwCJ2");
poke_combusken.ataques.push(
    {name:"Lanzallamas",id:"atack_1"},
    {name:"Doble patada",id:"atack_2"},
    {name:"Envite ígneo",id:"atack_3"},
    {name:"Patada ígnea",id:"atack_4"}
);

let poke_duskull = new Pokemon("Duskull","http://drive.google.com/uc?export=view&id=1qQEBXeITKFibSrMB20Eyuo_VGUumVJC8");
poke_duskull.ataques.push(
    {name:"Bola sombra",id:"atack_1"},
    {name:"Impresionar",id:"atack_2"},
    {name:"Fuego fatuo",id:"atack_3"},
    {name:"Tinieblas",id:"atack_4"}
);

let poke_jigglypuff = new Pokemon("Jigglypuff","http://drive.google.com/uc?export=view&id=1SsfTQsIB54HNKqwaKsxwHoUjRiqAFw9D");
poke_jigglypuff.ataques.push(
    {name:"Encanto",id:"atack_1"},
    {name:"Golpe cuerpo",id:"atack_2"},
    {name:"Voz cautivadora",id:"atack_3"},
    {name:"Rizo defensa",id:"atack_4"}
);

let poke_psyduck = new Pokemon("Psyduck","http://drive.google.com/uc?export=view&id=1yyXY-3Me5VF7nWZOD6lZPwYMmn7SjxF_");
poke_psyduck.ataques.push(
    {name:"Amnesia",id:"atack_1"},
    {name:"Arañazo",id:"atack_2"},
    {name:"Confusión",id:"atack_3"},
    {name:"Cabezazo zen",id:"atack_4"}
);

let poke_gyarados = new Pokemon("Gyarados","http://drive.google.com/uc?export=view&id=11WySTOHq75-bn_YyxFxWU7nsd0ZdUwjQ");
poke_gyarados.ataques.push(
    {name:"Amnesia",id:"atack_1"},
    {name:"Arañazo",id:"atack_2"},
    {name:"Confusión",id:"atack_3"},
    {name:"Cabezazo zen",id:"atack_4"}
);

let poke_dragonite = new Pokemon("Dragonite","http://drive.google.com/uc?export=view&id=1uvojy-ildW7Q5nM9HyMYQU2xIK7JcsHU");
poke_dragonite.ataques.push(
    {name:"Lanzallamas",id:"atack_1"},
    {name:"Danza dragón",id:"atack_2"},
    {name:"Puño dinámico",id:"atack_3"},
    {name:"Onda trueno",id:"atack_4"}
);

let poke_mewtwo = new Pokemon("Mewtwo","http://drive.google.com/uc?export=view&id=1DURyLs4e1XDqLJbTHpQPPRV4G1zsnwiB");
poke_mewtwo.ataques.push(
    {name:"Esfera aural",id:"atack_1"},
    {name:"Psicocorte",id:"atack_2"},
    {name:"Meteoros",id:"atack_3"},
    {name:"Premonición",id:"atack_4"}
);

let poke_eevee = new Pokemon("Eevee","http://drive.google.com/uc?export=view&id=1lxrs6cIJKZeSyWRvzmsPHrZ8YwUOh9PB");
poke_eevee.ataques.push(
    {name:"Mordisco",id:"atack_1"},
    {name:"Látigo",id:"atack_2"},
    {name:"Ojitos tiernos",id:"atack_3"},
    {name:"Doble filo",id:"atack_4"}
);

pokemonList.push(
    poke_pikachu,
    poke_combusken,
    poke_duskull,
    poke_jigglypuff,
    poke_psyduck,
    poke_gyarados,
    poke_dragonite,
    poke_mewtwo,
    poke_eevee
);

function auxSelPokemonHtml(x,i){
    let htmlDialog = `
    <label for="poke${i}" class="tarjet_pokemon" id="tar_poke${i}">
        <p>${pokemonList[x].name}</p>
        <img src="${pokemonList[x].img}" alt="${pokemonList[x].name}">
    </label>
    <input id="poke${i}" type="radio" name="poke_player"></input>
    `;

    containerSelPlayer.innerHTML += htmlDialog;
} 

function showPokemonCSS(){
    
    optionPokemon1 = randNumber(0,pokemonList.length);

    do{
        optionPokemon2 = randNumber(0,pokemonList.length);
    }
    while(optionPokemon2 == optionPokemon1);

    do{
        optionPokemon3 = randNumber(0,pokemonList.length);
    }
    while(optionPokemon3 == optionPokemon1 || optionPokemon3 == optionPokemon2);

    auxSelPokemonHtml(optionPokemon1,1);
    auxSelPokemonHtml(optionPokemon2,2);
    auxSelPokemonHtml(optionPokemon3,3);
}


//Variables de CSS - Batalla Pokemon
const cssDegradadoHistorial = document.getElementById("degCombate");

//Ocultar Elementos
function hideUX(){
    sectionBatalla.style.display = "none";
    sectionReset.style.display = "none";
    sectionMapa.style.display ="none";
}

//funcion randomizador
function randNumber(min,max){
    return Math.floor((max-min)*Math.random()+min);
}

//Game over Mensaje
function final(win){
    parrafo = document.createElement("p");
    parrafo.innerHTML = "Juego terminado. "+win;
    historial.appendChild(parrafo);
}

//Historial de ataques
function historiaCombate(){
    let auxAtkPlayer = "";
    let auxAtkPc = "";
    let auxWiner = "";

    parrafo = document.createElement("p");

    if(gameOver == true){
        console.log("Juego terminado");

    }else{
        switch(ataqueJugador){
            case 1:
                auxAtkPlayer = pokemonJugador.ataques[0].name;
                break;
            case 2:
                auxAtkPlayer = pokemonJugador.ataques[1].name;
                break;
            case 3:
                auxAtkPlayer = pokemonJugador.ataques[2].name;
                break;
        }
    
        switch(ataquePc){
            case -1:
                auxAtkPc = pokemonPC.ataques[0].name;
                break;
            case -2:
                auxAtkPc = pokemonPC.ataques[1].name;
                break;
            case -3:
                auxAtkPc = pokemonPC.ataques[2].name;
                break;
        }
    
        switch(battleWiner){
            case 0:
                auxWiner = "Empate"
                break;
            case 1:
                auxWiner = "Enemigo herido"
                break;
            case 2:
                auxWiner = "Recibes daño"
                break;
        }
    
        parrafo.innerHTML = `Usaste <span class="hst_player">`+auxAtkPlayer+`</span><br>Enemigo uso <span class="hst_pc">`+auxAtkPc+`</span><br>`+auxWiner;
        historial.appendChild(parrafo);
    }
}

//Desactivar botones
function desactivarBotones(){
    atk_1.disabled = true;
    atk_2.disabled = true;
    atk_3.disabled = true;

    sectionReset.style.display="flex";
}

//Calculos del Combate
function saludEnemigo(){
    if(gameOver == true){
        console.log("juego terminado");
    }else{
        vida_enemigo = vida_enemigo - 1;
        spanPcVida.innerHTML = vida_enemigo;
        if(vida_enemigo == 0){
            gameOver = true;
            desactivarBotones();
            final("Tu Ganaste");
        }
    }
}

function saludPlayer(){
    if(gameOver == true){
        console.log("juego terminado");
    }else{
        vida_player = vida_player - 1;
        spanPlayerVida.innerHTML = vida_player;
        if(vida_player == 0){
            gameOver = true;
            desactivarBotones();
            final("Perdiste");
        }
    }
}

function batalla(){
    let resultado = ataqueJugador+ataquePc;
    
    if(resultado == 0){
        console.log("empate");
        battleWiner = 0;
    }else if(Math.abs(resultado) == 1){
        saludEnemigo();
        battleWiner = 1;
        console.log("ganaste")
    }else{
        saludPlayer();
        battleWiner = 2;
        console.log("perdiste")
    }
}

//Ataques del eneigo
function enemyAtack(){
    switch(randNumber(0,pokemonPC.ataques.length-1)){
        case 0:
            ataquePc = -1;
            break;
        case 1:
            ataquePc = -2;
            break;
        case 2:
            ataquePc = -3;
            break;
    }
    console.log("PC: "+ataquePc);
    console.log("Player: "+ataqueJugador);
    degradadoHistorial();
}

// Degradado del Historial
function degradadoHistorial(){
    if(historyInfoDeg < 2){
        historyInfoDeg = historyInfoDeg + 1;
    }else if(historyInfoDeg == 2){
        cssDegradadoHistorial.style.display = "block";
    }
}

//Ataques del Jugador
function playerAtack1(){
    ataqueJugador = 1;
    enemyAtack();
    batalla();
    historiaCombate();
    historial.scrollBy(0,-innerHeight);
}

function playerAtack2(){
    ataqueJugador = 2;
    enemyAtack();
    batalla();
    historiaCombate();
    historial.scrollBy(0,-innerHeight);
}

function playerAtack3(){
    ataqueJugador = 3;
    batalla();
    enemyAtack();
    historiaCombate();
    historial.scrollBy(0,-innerHeight);
}

function newGame(){
    location.reload();
}

//Mundo Abierto
function drawCanvas(){
    pokemonJugador.cordX = pokemonJugador.cordX + pokemonJugador.velX;
    pokemonJugador.cordy = pokemonJugador.cordy + pokemonJugador.velY;

    mapa.clearRect(0,0,mapaTablero.width,mapaTablero.height);
    
    mapa.drawImage(canvaBackground,0,0,mapaTablero.width,mapaTablero.height);
    
    pokemonJugador.drawPokemon();

    //mapa.drawImage(canvaBackgroundFront,0,0,mapaTablero.width,mapaTablero.height);
}

function mapaStop(){
    pokemonJugador.velX = 0;
    pokemonJugador.velY = 0;
}

function mapaMover(e){
    switch(e){
        case 0:
            pokemonJugador.velX = 5;
            break;
        case 1:
            pokemonJugador.velX = -5;
            break;
        case 2:
            pokemonJugador.velY = -5;
            break;
        case 3:
            pokemonJugador.velY = 5;
            break;
    }
};

function auxSelPokemon(){
    spanPlayer.innerHTML = pokemonJugador.name;
    //sectionBatalla.style.display = "flex";

    sectionMapa.style.display="flex";
    drawCanvas();
    
    sectionSelPokemon.style.display = "none";
    intervalTimer = setInterval(drawCanvas, 60);

    window.addEventListener("keydown",(e)=>{
        switch(e.key){
            case "ArrowUp":
                mapaMover(2);
                break;
            case "ArrowDown":
                mapaMover(3);
                break;
            case "ArrowLeft":
                mapaMover(1);
                break;
            case "ArrowRight":
                mapaMover(0);
                break;
        }
    });

    window.addEventListener("keyup",mapaStop);
}

//CSS seleccion de pokemon

function selPokemon(){
    //jugador
    if(pokemon1.checked){
        pokemonJugador = pokemonList[optionPokemon1];
        auxSelPokemon();
    }else if(pokemon2.checked){
        pokemonJugador = pokemonList[optionPokemon2];
        auxSelPokemon();
    }else if(pokemon3.checked){
        pokemonJugador = pokemonList[optionPokemon3];
        auxSelPokemon();
    }else{
        alert("no hay pokemon seleccionado");
    }

    //selecionar pokemones enemigos
    pokemonPC = pokemonList[randNumber(0,pokemonList.length)];

    do{
        pokemonPC2 = pokemonList[randNumber(0,pokemonList.length)];    
    }while(pokemonPC2 == pokemonPC);

    do{
        pokemonPC3 = pokemonList[randNumber(0,pokemonList.length)];
    }while(pokemonPC3 == pokemonPC2 || pokemonPC3 == pokemonPC);


    spanPc.innerHTML = pokemonPC.name;

    atk_1.innerHTML = pokemonJugador.ataques[0].name;
    atk_2.innerHTML = pokemonJugador.ataques[1].name;
    atk_3.innerHTML = pokemonJugador.ataques[2].name;
}

//Inicialización del Juego
window.addEventListener("load",()=>{
    hideUX();
    showPokemonCSS();

    pokemon1 = document.getElementById("poke1");
    pokemon2 = document.getElementById("poke2");
    pokemon3 = document.getElementById("poke3");
    
    cssPoke1 = document.getElementById("tar_poke1");
    cssPoke2 = document.getElementById("tar_poke2");
    cssPoke3 = document.getElementById("tar_poke3");

    pokemon1.addEventListener("click",()=>{
        cssPoke1.setAttribute("class","tarjet_pokemon_check");
        
        cssPoke2.setAttribute("class","tarjet_pokemon");
        cssPoke3.setAttribute("class","tarjet_pokemon");
    });

    pokemon2.addEventListener("click",()=>{
        cssPoke2.setAttribute("class","tarjet_pokemon_check");

        cssPoke1.setAttribute("class","tarjet_pokemon");
        cssPoke3.setAttribute("class","tarjet_pokemon");
    });

    pokemon3.addEventListener("click",()=>{
        cssPoke3.setAttribute("class","tarjet_pokemon_check");

        cssPoke1.setAttribute("class","tarjet_pokemon");
        cssPoke2.setAttribute("class","tarjet_pokemon");
    });

    btn_confirm.addEventListener("click",selPokemon);
    btn_reset.addEventListener("click",newGame);

    atk_1.addEventListener("click",playerAtack1)
    atk_2.addEventListener("click",playerAtack2)
    atk_3.addEventListener("click",playerAtack3)
});