//variables globales
let gameOver = false;
let battleWiner;
let historyInfoDeg = 0;
let pokemonList = [];

//variables de seleccion de jugador
const containerSelPlayer = document.getElementById("tarjetContainer");

//variables de Secciones
const sectionBatalla = document.getElementById("info_battle");
const sectionSelPokemon = document.getElementById("selec_player");
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

//Clase para Pokemon
class Pokemon{
    constructor(name,img,idImput,idTarj){
        this.img = img;
        this.name = name;
        this.idImput = idImput;
        this.idTarj = idTarj;
        this.ataques = [];
    }
}

//Objetos Pokemon
let poke_pikachu = new Pokemon("Pikachu","http://drive.google.com/uc?export=view&id=1Uk1tlgelpchcb-3_b8lVxUPeWa_wd4l4","poke1","tar_poke1");
poke_pikachu.ataques.push(
    {name:"Impactrueno",id:"atack_1"},
    {name:"Ataque rápido",id:"atack_2"},
    {name:"Chispazo",id:"atack_3"}
);

let poke_combusken = new Pokemon("Combusken","http://drive.google.com/uc?export=view&id=1AeLeu1r0eJUS_XpstRRKs9NXN9cVwCJ2","poke2","tar_poke2");
poke_combusken.ataques.push(
    {name:"Lanzallamas",id:"atack_1"},
    {name:"Doble patada",id:"atack_2"},
    {name:"Envite ígneo",id:"atack_3"}
);

let poke_duskull = new Pokemon("Duskull","http://drive.google.com/uc?export=view&id=1qQEBXeITKFibSrMB20Eyuo_VGUumVJC8","poke3","tar_poke3");
poke_duskull.ataques.push(
    {name:"Bola sombra",id:"atack_1"},
    {name:"Impresionar",id:"atack_2"},
    {name:"Fuego fatuo",id:"atack_3"}
);

pokemonList.push(poke_pikachu,poke_combusken,poke_duskull);

pokemonList.forEach((Pokemon)=>{
    let htmlDialog = `
    <label for="${Pokemon.idImput}" class="tarjet_pokemon" id="${Pokemon.idTarj}">
        <p>${Pokemon.name}</p>
        <img src="${Pokemon.img}" alt="${Pokemon.name}">
    </label>
    <input id="${Pokemon.idImput}" type="radio" name="poke_player"></input>
    `;

    containerSelPlayer.innerHTML += htmlDialog;
});

//Variables de CSS - Batalla Pokemon
const cssDegradadoHistorial = document.getElementById("degCombate");

//Ocultar Elementos
function hideUX(){
    sectionBatalla.style.display = "none";
    sectionReset.style.display = "none";
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
                auxAtkPlayer = "Ataque 1"
                break;
            case 2:
                auxAtkPlayer = "Ataque 2"
                break;
            case 3:
                auxAtkPlayer = "Ataque 3"
                break;
        }
    
        switch(ataquePc){
            case -1:
                auxAtkPc = "Ataque 1"
                break;
            case -2:
                auxAtkPc = "Ataque 2"
                break;
            case -3:
                auxAtkPc = "Ataque 3"
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
    
        parrafo.innerHTML = "Usaste ataque "+auxAtkPlayer+"\rEnemigo uso "+auxAtkPc+". "+auxWiner;
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
    switch(randNumber(1,4)){
        case 1:
            ataquePc = -1;
            break;
        case 2:
            ataquePc = -2;
            break;
        case 3:
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

window.addEventListener("load",()=>{
    hideUX();

    const pokemon1 = document.getElementById("poke1");
    const pokemon2 = document.getElementById("poke2");
    const pokemon3 = document.getElementById("poke3");

    const cssPoke1 = document.getElementById("tar_poke1");
    const cssPoke2 = document.getElementById("tar_poke2");
    const cssPoke3 = document.getElementById("tar_poke3");

    pokemon1.addEventListener("click",cssSelPokemon)
    pokemon2.addEventListener("click",cssSelPokemon)
    pokemon3.addEventListener("click",cssSelPokemon)

    function cssSelPokemon(){
        if(pokemon1.checked){
            cssPoke1.setAttribute("class","tarjet_pokemon_check");
            
            cssPoke2.setAttribute("class","tarjet_pokemon");
            cssPoke3.setAttribute("class","tarjet_pokemon");
        }else if(pokemon2.checked){
            cssPoke2.setAttribute("class","tarjet_pokemon_check");
    
            cssPoke1.setAttribute("class","tarjet_pokemon");
            cssPoke3.setAttribute("class","tarjet_pokemon");
        }else if(pokemon3.checked){
            cssPoke3.setAttribute("class","tarjet_pokemon_check");
    
            cssPoke1.setAttribute("class","tarjet_pokemon");
            cssPoke2.setAttribute("class","tarjet_pokemon");
        }
    }

    function selPokemon(){
    
        //jugador
        if(pokemon1.checked){
            spanPlayer.innerHTML = "Pokemon1";
            sectionBatalla.style.display = "flex";
            sectionSelPokemon.style.display = "none";
        }else if(pokemon2.checked){
            spanPlayer.innerHTML = "Pokemon2";
            sectionBatalla.style.display = "flex";
            sectionSelPokemon.style.display = "none";
        }else if(pokemon3.checked){
            spanPlayer.innerHTML = "Pokemon3";
            sectionBatalla.style.display = "flex";
            sectionSelPokemon.style.display = "none";
        }else{
            alert("no hay pokemon seleccionado");
        }
    
        //selecionar pokemon enemigo
        switch(randNumber(1,4)){
            case 1:
                spanPc.innerHTML = "Pokemon1";
                break;
            case 2:
                spanPc.innerHTML = "Pokemon2";
                break;
            case 3:
                spanPc.innerHTML = "Pokemon3";
                break;
        }
    }

    btn_confirm.addEventListener("click",selPokemon);
    btn_reset.addEventListener("click",newGame);

    atk_1.addEventListener("click",playerAtack1)
    atk_2.addEventListener("click",playerAtack2)
    atk_3.addEventListener("click",playerAtack3)
})