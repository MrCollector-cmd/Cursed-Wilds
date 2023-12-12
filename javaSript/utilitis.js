import { listHand,slotsA,mana,rowE,hand,mazo,player,atacks} from "./statics.js";
import { creatureCard } from "./classCards.js";
import { mazoUno } from "./mallet.js";
// >>>>>>>>>>>>>>>>>>>>> variables
let windowMid = window.innerWidth/2;
let handMid = hand.clientWidth/2;
let mid = (windowMid/handMid);  
// >>>>>>>>>>>>>>>>>>>>> Funciones locales
function desorderArray(array) {
    var i,j,k;
    for (i = array.length; i; i--) {
        j = Math.floor(Math.random() * i);
        k = array[i - 1];
        array[i - 1] = array[j];
        array[j] = k;
    }
    return array;
}
function discountOfMana(manaValue) {
    let aux = document.querySelectorAll('.cont') 
    console.log(aux)
    for (let i = 0; i < manaValue; i++) {
        aux.item(i).remove()    
    }
}
function findClassOfHand() {
    let ids = ['I','II','III','IIII'];
    let objects = hand.children;
    let iter = [];
    let resp = []
    for (let i = 0; i < ids.length; i++) {
        if(objects[i] != undefined) {
            iter.push(objects[i].classList[1])
        }
    }for (let i = 0; i < ids.length; i++) {
        if (iter.indexOf(ids[i]) == -1) {
            resp.push(ids[i])
        }
    }
    return resp;
}
function malletVoid(mallet) {
    let contMallet = 0;
    for (let i = 0; i < mallet.length; i++) {
        if (mallet[i].amount == 0) {
            contMallet++;
        }
    }
    console.log('cont malet ',contMallet)
    if (contMallet == mallet.length) {
        return false;
    }
    return true;
}
function drawCard(idHand) {
    let tipos = Math.floor(Math.random()*mazoUno.length);
    let numAtacks = parseInt(atacks.innerHTML);
    let cach = 1;
    let newCardInHand = mazoUno[tipos]
    console.log(malletVoid(mazoUno))
    if(newCardInHand.amount > 0) {
            hand.innerHTML += `<div class="card ${idHand[0]} ${newCardInHand.id} handCard" draggable="true" id="${newCardInHand.id}${newCardInHand.amount}"><h3 class="atack">${newCardInHand.damage}</h3><h3>/</h3><h3 class="life">${newCardInHand.life}</h3></div>`;
            newCardInHand.amount--;
            numAtacks--;
            atacks.innerHTML = numAtacks;
            cach = 0;
    }
    else if (malletVoid(mazoUno) != false){
        console.log(malletVoid(mazoUno))
        tipos = Math.floor(Math.random()*mazoUno.length);
        numAtacks = parseInt(atacks.innerHTML);
        drawCard(idHand)
    }
}
// >>>>>>>>>>>>>>>>>>>> Funciones globales
export function spawnPlayer(play) {
    console.log(player.children.item(0).innerHTML = play.damage)
    console.log(player.children.item(2).innerHTML = play.life)
}
export function spawnEnemis(mazo) {
let aux = [0,1,2,3,4]
aux = desorderArray(aux);
for (let i = 0; i < mazo.amount; i++) {
    let pos = aux[i];
    let npc = new creatureCard(mazo.life,mazo.damage,mazo.mana,mazo.efect,mazo.id,mazo.dead,mazo.bouth)
    rowE.children[pos].innerHTML = `<div class="card ${npc.id}"><h3 class="atack">${npc.damage}</h3><h3>/</h3><h3 class="life">${npc.life}</h3></div>`
}
}
export function controlMazo(mazoP) {
    let ids = ['IIII','III','II','I'];
    let first = 0;
    ids = desorderArray(ids);
    if(hand.children.length == 0 && first == 0){
        for (let i = 0; i < ids.length; i++) {
            let pos = ids[i];
            hand.innerHTML += `<div class="card ${pos} ${mazoP[i].id} handCard" draggable="true" id="${mazoP[i].id}${mazoP[i].amount}"><h3 class="atack">${mazoP[i].damage}</h3><h3>/</h3><h3 class="life">${mazoP[i].life}</h3></div>`;
            mazoP[i].amount--;
        }
        first++;
    }
}
export function createMana(){
    const manaIm = document.createElement('img')
    manaIm.src = "../source/new/mana.png";
    manaIm.classList.add('manaGif',`cont`);
    return manaIm;
}
export function mouseControl(){
    listHand.forEach(element =>{
        element.addEventListener('dragstart',e=>{
            var cardPointer = e.srcElement.id;
            var idCard = [...e.srcElement.classList][2];
            e.dataTransfer.setData('id',cardPointer);
            e.dataTransfer.setData('class',e.target.arr)
            e.dataTransfer.setData('idCard',idCard)
        })
    });
    slotsA.forEach(element =>{
        element.addEventListener('dragstart',e=>{
            var cardPointer = e.srcElement.id;
            var idCard = [...e.srcElement.classList][2];
            var posSlot = e.target.parentNode.classList[1];
            e.dataTransfer.setData('id',cardPointer);
            e.dataTransfer.setData('idCard',idCard)
            e.dataTransfer.setData('posSlot',posSlot)
        })
        element.addEventListener('dragleave',e=>{
            e.target.classList.remove('hoverS');
        })
        element.addEventListener('dragover',e=>{
            e.preventDefault();
            e.target.classList.add('hoverS');
        })
        element.addEventListener('drop',e=>{
            e.target.classList.remove('hoverS');
            const ids = e.dataTransfer.getData('id');
            const cardId = e.dataTransfer.getData('idCard');
            const posSlot = e.dataTransfer.getData('posSlot')
            let cards = document.getElementById(ids);
            let manaCounter = mana.lastChild.childElementCount;
            mazoUno.forEach(elem => {
                if (cardId == elem.id && elem.mana <= manaCounter && cards.classList.contains('handCard')) {
                    if(element.firstChild == null ){
                        cards.classList.remove('handCard')
                        document.getElementById(ids).classList.add('normalize')
                        e.target.appendChild(document.getElementById(ids));
                        console.log(ids)
                        elem.bouth = 1;
                        discountOfMana(elem.mana);
                    }
                }else if(cardId == elem.id&&elem.bouth == 1 && cards.classList.contains('handCard') == false){
                    if(element.firstChild == null){
                        document.getElementById(ids).classList.add('normalize')
                        e.target.appendChild(document.getElementById(ids));
                    }else if (element.firstChild != null) {
                        let aux;
                        let contThisSlot = document.getElementById(element.classList[1]);
                        let contOtherSlot = document.getElementById(posSlot);
                        contThisSlot.appendChild(document.getElementById(ids));
                        aux = contThisSlot.firstChild;
                        contOtherSlot.appendChild(aux)
                    }
                }
            })
        })
    })
    mazo.addEventListener("click",e=>{
        let numAtacks = parseInt(atacks.innerHTML);
        console.log(numAtacks)
        if(hand.childNodes.length < 5 && numAtacks > 0){
            let elemFal = findClassOfHand();
            console.log(elemFal)
            drawCard(elemFal);
        }
    })
}
export function targetInSlot(slots){
    let infSlot = [];
    let pos,id,idSlot;
    for (let i = 0; i < 5; i++) {
        if(slots.children[i].firstChild != null){
            id = slots.children[i].firstChild.classList[2];
            pos= i;
            idSlot = slots.children[i].classList[1];
            infSlot.push({'position':pos,'id':id,'idSlot':idSlot});
        }
    }
    return infSlot;
}
export function targetSlotVoid(slots){
    let infSlot = [];
    let idSlot,pos;
    for (let i = 0; i < 5; i++) {
        if(slots.children[i].firstChild == null){
            idSlot = slots.children[i].classList[1];
            pos= i;
            infSlot.push({'position':pos,'idSlot':idSlot});
        }
    }
    return infSlot;
}