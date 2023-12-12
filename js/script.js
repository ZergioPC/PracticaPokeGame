//variables globales
let gameOver = false;
let battleWiner;

//variables del jugador
let pokemon1 = document.getElementById("poke1");
let pokemon2 = document.getElementById("poke2");
let pokemon3 = document.getElementById("poke3");

//variables de Secciones
let sectionBatalla = document.getElementById("info_battle");
let sectionSelPokemon = document.getElementById("selec_player");
let sectionReset = document.getElementById("endgame");

//variables info battle
let spanPlayer = document.getElementById("spanplayer");
let spanPlayerVida = document.getElementById("player_vidas");
let spanPc = document.getElementById("spanpc");
let spanPcVida = document.getElementById("pc_vidas");

//var botones confirm
let btn_confirm = document.getElementById("confirm");
let btn_reset = document.getElementById("btn_reset");

//variables pokemon vidas
let vida_player = 3;
let vida_enemigo = 3;

//variables de ataques
let atk_1 = document.getElementById("atack_1"); 
let atk_2 = document.getElementById("atack_2"); 
let atk_3 = document.getElementById("atack_3"); 

let ataqueJugador = 0;
let ataquePc = 0;

//Variables section "combate"
let historial = document.getElementById("combate");
let parrafo;

//Variables de CSS - Seleccion de pokemon
let cssPoke1 = document.getElementById("tar_poke1");
let cssPoke2 = document.getElementById("tar_poke2");
let cssPoke3 = document.getElementById("tar_poke3");

//CSS seleccion de Pokemon
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

//Ocultar Elementos
function hideUX(){
    sectionBatalla.style.display = "none";
    sectionReset.style.display = "none";
}

//funcion randomizador
function randNumber(min,max){
    return Math.floor((max-min)*Math.random()+min);
}

//seleccionar pokemon del jugador
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

//CSS EventListener
pokemon1.addEventListener("click",cssSelPokemon)
pokemon2.addEventListener("click",cssSelPokemon)
pokemon3.addEventListener("click",cssSelPokemon)

//EventListeners
btn_confirm.addEventListener("click",selPokemon);
btn_reset.addEventListener("click",newGame);

atk_1.addEventListener("click",playerAtack1)
atk_2.addEventListener("click",playerAtack2)
atk_3.addEventListener("click",playerAtack3)

window.addEventListener("load",hideUX)