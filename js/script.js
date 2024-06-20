const $imgs = document.querySelectorAll('#imagenes img');
console.log($imgs)

//variables globales
let gameOver = false;
let battleWiner;
let historyInfoDeg = 0;
let pokemonList = [];
let onBattle = false;

let pokemonJugador;
let pokemonPC;
let pokemonPC2;
let pokemonPC3;
let pokemonEnemigo;


let optionPokemon1; 
let optionPokemon2; 
let optionPokemon3;

let intervalTimer;

//variables aux HTML
const auxHtmlH2 = document.getElementById("auxH2");
const auxHtmlL = document.getElementById("auxL");

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
const atk_4 = document.getElementById("atack_4"); 

let ataqueJugador = 0;
let ataquePc = 0;

//Variables section "combate"
const historial = document.getElementById("combate");
const combateJugador = document.getElementById("batallaJugadorVisual");
const combateEnemy = document.getElementById("batallaEnemigoVisual");

let batalla_player_img;
let batalla_enemy_img;

let parrafo;

//Variables del mundo abierto
let mapaTablero = document.getElementById("mapa_tablero");
    mapaTablero.width = 630;
    mapaTablero.height = 387;

let mapa = mapaTablero.getContext("2d");
let canvaBackground = $imgs[0];
let canvaBackgroundFront = $imgs[1];

let btnUp;
let btnDwn;
let btnL;
let btnR;

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
        this.canvas = img;
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
let poke_pikachu = new Pokemon("Pikachu",$imgs[9]);
poke_pikachu.ataques.push(
    {name:"Impactrueno",id:"atack_1"},
    {name:"Ataque rápido",id:"atack_2"},
    {name:"Chispazo",id:"atack_3"},
    {name:"Puño trueno",id:"atack_4"}
);

let poke_combusken = new Pokemon("Combusken",$imgs[2]);
poke_combusken.ataques.push(
    {name:"Lanzallamas",id:"atack_1"},
    {name:"Doble patada",id:"atack_2"},
    {name:"Envite ígneo",id:"atack_3"},
    {name:"Patada ígnea",id:"atack_4"}
);

let poke_duskull = new Pokemon("Duskull",$imgs[4]);
poke_duskull.ataques.push(
    {name:"Bola sombra",id:"atack_1"},
    {name:"Impresionar",id:"atack_2"},
    {name:"Fuego fatuo",id:"atack_3"},
    {name:"Tinieblas",id:"atack_4"}
);

let poke_jigglypuff = new Pokemon("Jigglypuff",$imgs[7]);
poke_jigglypuff.ataques.push(
    {name:"Encanto",id:"atack_1"},
    {name:"Golpe cuerpo",id:"atack_2"},
    {name:"Voz cautivadora",id:"atack_3"},
    {name:"Rizo defensa",id:"atack_4"}
);

let poke_psyduck = new Pokemon("Psyduck",$imgs[10]);
poke_psyduck.ataques.push(
    {name:"Amnesia",id:"atack_1"},
    {name:"Arañazo",id:"atack_2"},
    {name:"Confusión",id:"atack_3"},
    {name:"Cabezazo zen",id:"atack_4"}
);

let poke_gyarados = new Pokemon("Gyarados",$imgs[6]);
poke_gyarados.ataques.push(
    {name:"Amnesia",id:"atack_1"},
    {name:"Arañazo",id:"atack_2"},
    {name:"Confusión",id:"atack_3"},
    {name:"Cabezazo zen",id:"atack_4"}
);

let poke_dragonite = new Pokemon("Dragonite",$imgs[3]);
poke_dragonite.ataques.push(
    {name:"Lanzallamas",id:"atack_1"},
    {name:"Danza dragón",id:"atack_2"},
    {name:"Puño dinámico",id:"atack_3"},
    {name:"Onda trueno",id:"atack_4"}
);

let poke_mewtwo = new Pokemon("Mewtwo",$imgs[8]);
poke_mewtwo.ataques.push(
    {name:"Esfera aural",id:"atack_1"},
    {name:"Psicocorte",id:"atack_2"},
    {name:"Meteoros",id:"atack_3"},
    {name:"Premonición",id:"atack_4"}
);

let poke_eevee = new Pokemon("Eevee",$imgs[5]);
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
        <img src="${pokemonList[x].img.src}" alt="${pokemonList[x].name}">
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
            case 4:
                auxAtkPlayer = pokemonJugador.ataques[3].name;
                break;
        }
    
        switch(ataquePc){
            case -1:
                auxAtkPc = pokemonEnemigo.ataques[0].name;
                break;
            case -2:
                auxAtkPc = pokemonEnemigo.ataques[1].name;
                break;
            case -3:
                auxAtkPc = pokemonEnemigo.ataques[2].name;
                break;
            case -4:
                auxAtkPc = pokemonEnemigo.ataques[3].name;
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
    
        parrafo.innerHTML = `Usaste <span class="hst_player">`+auxAtkPlayer+`</span><br>`+pokemonEnemigo.name+` uso <span class="hst_pc">`+auxAtkPc+`</span><br>`+auxWiner;
        historial.appendChild(parrafo);
    }
}

//Desactivar botones
function desactivarBotones(){
    atk_1.disabled = true;
    atk_2.disabled = true;
    atk_3.disabled = true;
    atk_4.disabled = true;
}

function reactivarBotones(){
    atk_1.disabled = false;
    atk_2.disabled = false;
    atk_3.disabled = false;
    atk_4.disabled = false;
}

//Calculos del Combate
function saludEnemigo(){
    let aux = "";

    batalla_enemy_img.setAttribute("class","batalla_hit");

    if(gameOver == true){
        console.log("juego terminado");
    }else{
        vida_enemigo = vida_enemigo - 1;

        for (let i = 0; i < vida_enemigo; i++) {
            aux += "🧡";
        }

        spanPcVida.innerHTML = aux;
        if(vida_enemigo == 0){
            batalla_enemy_img.setAttribute("class","batalla_dead");
            gameOver = true;
            desactivarBotones();
            final("Tu Ganaste");
            sectionReset.style.display="flex";
        }
    }

    aux2 = setInterval(()=>{
        if(gameOver == false){
            batalla_enemy_img.removeAttribute("class");
        }
    },1000);

}

function saludPlayer(){
    let aux = "";

    batalla_player_img.setAttribute("class","batalla_hit");
    
    if(gameOver == true){
        console.log("juego terminado");
    }else{
        vida_player = vida_player - 1;

        for (let i = 0; i < vida_player; i++) {
            aux += "💙";
        }

        spanPlayerVida.innerHTML = aux;
        if(vida_player == 0){
            batalla_player_img.setAttribute("class","batalla_dead");
            gameOver = true;
            desactivarBotones();
            final("Perdiste");
            sectionReset.style.display="flex";
        }
    }
    
    aux2 = setInterval(()=>{
        if(gameOver == false){
            batalla_player_img.removeAttribute("class");
        }
    },1000);

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
    }else if(Math.abs(resultado) == 2){
        saludPlayer();
        battleWiner = 2;
        console.log("perdiste")
    }else{
        switch(randNumber(0,3)){
            case 0:
                console.log("empate");
                battleWiner = 0;   
                break;
            case 1:
                saludEnemigo();
                battleWiner = 1;
                console.log("ganaste")
                break;
            case 2:
                saludPlayer();
                battleWiner = 2;
                console.log("perdiste")
                break;
        }
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
        case 3:
            ataquePc = -4;
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
    let aux;

    desactivarBotones();
    aux = setTimeout(()=>{
        reactivarBotones();
    },1000);

    ataqueJugador = 1;
    enemyAtack();
    batalla();
    historiaCombate();
    historial.scrollBy(0,-innerHeight);
}

function playerAtack2(){
    let aux;

    desactivarBotones();
    aux = setTimeout(()=>{
        reactivarBotones();
    },1000);

    ataqueJugador = 2;
    enemyAtack();
    batalla();
    historiaCombate();
    historial.scrollBy(0,-innerHeight);
}

function playerAtack3(){
    let aux;

    desactivarBotones();
    aux = setTimeout(()=>{
        reactivarBotones();
    },1000);

    ataqueJugador = 3;
    batalla();
    enemyAtack();
    historiaCombate();
    historial.scrollBy(0,-innerHeight);
}

function playerAtack4(){
    let aux;

    desactivarBotones();
    aux = setTimeout(()=>{
        reactivarBotones();
    },1000);

    ataqueJugador = 4;
    batalla();
    enemyAtack();
    historiaCombate();
    historial.scrollBy(0,-innerHeight);
}

function newGame(){
    location.reload();
}

function batallaVisuales(){
    combateEnemy.innerHTML =`<img src="${pokemonEnemigo.img.src}" id="batallaEnemyImg"/>`;
    combateJugador.innerHTML =`<img src="${pokemonJugador.img.src}" id="batallaPlayerImg"/>`;

    batalla_enemy_img = document.getElementById("batallaEnemyImg");
    batalla_enemy_img.setAttribute("class","batalla_inicio");

    batalla_player_img = document.getElementById("batallaPlayerImg");
    batalla_player_img.setAttribute("class","batalla_inicio");
}

//Mundo Abierto
function mapaColisionEnemigos(enemy){
    if(
        (pokemonJugador.cordX+15) > (enemy.cordX+75) ||
        (pokemonJugador.cordX+75) < (enemy.cordX+15) ||
        (pokemonJugador.cordy+30) > (enemy.cordy+90) ||
        (pokemonJugador.cordy+90) < (enemy.cordy+30)
        ){
            return;
    }
    pokemonEnemigo = enemy;
    batallaVisuales();
    
    spanPc.innerHTML = enemy.name;
    mapaStop();
    onBattle = true;
    sectionBatalla.style.display = "flex";
    sectionMapa.style.display = "none";
    auxHtmlH2.style.display = "none";
    auxHtmlL.style.display = "none";
}

function drawCanvas(){
    pokemonJugador.cordX = pokemonJugador.cordX + pokemonJugador.velX;
    pokemonJugador.cordy = pokemonJugador.cordy + pokemonJugador.velY;

    mapa.clearRect(0,0,mapaTablero.width,mapaTablero.height);
    
    mapa.drawImage(canvaBackground,0,0,mapaTablero.width,mapaTablero.height);
    
    pokemonJugador.drawPokemon();

    pokemonPC.drawPokemon();
    pokemonPC2.drawPokemon();
    pokemonPC3.drawPokemon();

    mapa.drawImage(canvaBackgroundFront,0,0,mapaTablero.width,mapaTablero.height);

    if(pokemonJugador.velX != 0 || pokemonJugador.velY != 0){
        mapaColisionEnemigos(pokemonPC);
        mapaColisionEnemigos(pokemonPC2);
        mapaColisionEnemigos(pokemonPC3);
    }
}

function mapaStop(){
    pokemonJugador.velX = 0;
    pokemonJugador.velY = 0;
}

function mapaMover(e){
    if(onBattle == false){
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
    }
};

function auxSelPokemon(){
    spanPlayer.innerHTML = pokemonJugador.name;

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

function posEnemyMapa(x,min,max){
    switch(randNumber(min,max)){
        case 0:
            x.cordX = 270;
            x.cordy = 10;
            break;
        case 1:
            x.cordX = 510;
            x.cordy = 10;
            break;
        case 2:
            x.cordX = 270;
            x.cordy = 150;
            break;
        case 3:
            x.cordX = 270;
            x.cordy = 150;
            break;
        case 4:
            x.cordX = 30;
            x.cordy = 300;
            break;
        case 5:
            x.cordX = 270;
            x.cordy = 300;
            break;
    }
}

//CSS seleccion de pokemon

function auxSelPokemonEnemigo(){
    
    do{
        pokemonPC = pokemonList[randNumber(0,pokemonList.length)];
    }while(pokemonPC == pokemonJugador);

    do{
        pokemonPC2 = pokemonList[randNumber(0,pokemonList.length)];    
    }while(pokemonPC2 == pokemonPC || pokemonPC2 == pokemonJugador);

    do{
        pokemonPC3 = pokemonList[randNumber(0,pokemonList.length)];
    }while(pokemonPC3 == pokemonPC2 || pokemonPC3 == pokemonPC || pokemonPC3 == pokemonJugador);

    posEnemyMapa(pokemonPC,0,2);
    posEnemyMapa(pokemonPC2,2,3);
    posEnemyMapa(pokemonPC3,4,6);
}

function auxSelAtkPC(){
    atk_1.innerHTML = pokemonJugador.ataques[0].name;
    atk_2.innerHTML = pokemonJugador.ataques[1].name;
    atk_3.innerHTML = pokemonJugador.ataques[2].name;
    atk_4.innerHTML = pokemonJugador.ataques[3].name;
}

function selPokemon(){
    //selecionar pokemones enemigos

    //jugador
    if(pokemon1.checked){
        pokemonJugador = pokemonList[optionPokemon1];
        auxSelPokemonEnemigo();
        auxSelPokemon();
        auxSelAtkPC();
    }else if(pokemon2.checked){
        pokemonJugador = pokemonList[optionPokemon2];
        auxSelPokemonEnemigo();
        auxSelPokemon();
        auxSelAtkPC();
    }else if(pokemon3.checked){
        pokemonJugador = pokemonList[optionPokemon3];
        auxSelPokemonEnemigo();
        auxSelPokemon();
        auxSelAtkPC();
    }else{
        alert("no hay pokemon seleccionado");
    }    
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
    atk_4.addEventListener("click",playerAtack4)
});