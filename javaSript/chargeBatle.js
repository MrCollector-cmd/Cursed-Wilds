import { mouseControl,spawnEnemis,controlMazo,spawnPlayer } from "./utilitis.js";
import { faseDeBatalla} from "./batlleOn.js";
import * as cards from "./allCards.js";
import { mazoUno,p } from "./mallet.js";
import { turn } from "./statics.js";
// Variables y Utilitarios
let cantOfGoblins = Math.floor(Math.random()*3)+1;
// let sound = new Audio('../source/multimedia/ambiente.mp3');
// sound.setAttribute('loop',true)
// sound.setAttribute('autoplay',true)
// console.log(sound.attributes)
// sound.play().catch().then()
export let mazo = {
    id:"goblins",
    life: 4,
    damage: 4,
    efect: null,
    dead: 1,
    mana: 4,
    bouth: 0,
    amount: cantOfGoblins,
};
let mazoP = mazoUno; 
// carga de la Partida
const gameStartedBatlle = ()=>{
    spawnPlayer(p)
    controlMazo(mazoP)
    spawnEnemis(mazo)
    mouseControl()
    faseDeBatalla();
}
gameStartedBatlle()
// posHand()
