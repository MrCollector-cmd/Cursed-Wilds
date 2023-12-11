import { buttonAtack,buttonPas,rowA,rowE,mana,player,turn,atacks,gameOver } from "./statics.js";
import { createMana,targetInSlot,targetSlotVoid } from "./utilitis.js";
import { mazoUno,p,e } from "./mallet.js";
import { mazo } from "./chargeBatle.js";
import { creatureCard } from "./classCards.js";
mana.lastChild.appendChild(createMana())
let slotPlayer = document.getElementById('player');
let numTurn = parseInt(turn.innerHTML)
let numAtacks = parseInt(atacks.innerHTML)
let playe = new creatureCard(p.life,p.damage,p.mana,p.efect,p.id,p.dead,p.bouth);
let enemi = new creatureCard(e.life,e.damage,e.mana,e.efect,e.id,e.dead,e.bouth);
let lifeAct = 23;
let lifeActEnemi = 23;
export function batallaEnProceso(){
    let rowAl = rowA
    let rowEn = rowE;
    let targets = [];
    let slotsVoidA = targetSlotVoid(rowAl)
    let slotsVoidE = targetSlotVoid(rowEn)
    let infCampA = targetInSlot(rowAl);
    let infCampE = targetInSlot(rowEn);
    const posAtacks = (infCampA,infCampE)=>{
        console.log('TU TURNO...')
        let criatureA,criatureE;
        if (slotsVoidA.length < 5) {
            infCampA.forEach((elementA) => {
                infCampE.forEach((elementE)=>{
                    if(elementA.position == elementE.position){
                        mazoUno.forEach(e =>{
                            if (elementA.id == e.id) {
                                criatureA = new creatureCard(e.life,e.damage,e.mana,e.efect,e.id,e.dead,e.bouth)
                            }
                        })
                        criatureE= new creatureCard(mazo.life,mazo.damage,mazo.mana,mazo.efect,mazo.id,mazo.dead,mazo.bouth)    
                        console.log(`se enfrentan ${criatureA.id} y ${criatureE.id}`)
                        criatureA.systemAtack(criatureE)
                        console.log(criatureA.dead,criatureE)
                        let life = criatureA.dead;
                        targets.push([elementE.idSlot,criatureE.dead])
                        targets.push([elementA.idSlot,life])
                        
                    }
                    // slotsVoidA.forEach(slotsV =>{
                    // if (elementE.position == slotsV.position) {
                    //     criatureE= new creatureCard(mazo.life,mazo.damage,mazo.mana,mazo.efect,mazo.id,mazo.dead,mazo.bouth)  
                    //     console.log(`se enfrentan ${criatureE.id} y ${playe.id}`)
                    //     criatureE.systemAtackPlayer(playe)
                    // }
                    // })
                    
                })
            });
            infCampA.forEach(elementA=>{
                slotsVoidE.forEach(slotsV=>{
                    if (elementA.position == slotsV.position) {
                        mazoUno.forEach(e =>{
                            if (elementA.id == e.id) {
                                criatureA = new creatureCard(e.life,e.damage,e.mana,e.efect,e.id,e.dead,e.bouth)
                            }
                        })
                        console.log(`se enfrentan ${criatureA.id} y ${enemi.id}`)
                        criatureA.systemAtackPlayer(enemi)
                        e.life = enemi.life;
                        lifeActEnemi -= criatureA.damage;
                        targets.push(['Enemi',enemi.dead])
                        console.log(lifeActEnemi)
                    }
                })
            })
        }
        console.log('FIN DEL TURNO...')
    }
    const posAtackEnemi = (infCampE,infCampA)=>{
        console.log('EL TURNO ENEMIGO...')
        let criatureE,criatureA;
        if (slotsVoidA.length < 5) {
            infCampE.forEach((elementE) => {
                infCampA.forEach((elementA)=>{
                    if(elementE.position == elementA.position){
                        mazoUno.forEach(e =>{
                            if (elementA.id == e.id) {
                                criatureA = new creatureCard(e.life,e.damage,e.mana,e.efect,e.id,e.dead,e.bouth)
                            }
                        })
                        criatureE= new creatureCard(mazo.life,mazo.damage,mazo.mana,mazo.efect,mazo.id,mazo.dead,mazo.bouth)    
                        console.log(`se enfrentan ${criatureE.id} y ${criatureA.id}`)
                        criatureE.systemAtack(criatureA)
                        console.log(criatureA)
                        targets.push([elementA.idSlot,criatureA.dead])
                        targets.push([elementE.idSlot,criatureE.dead])
                    }
                    // slotsVoidA.forEach(slotsV =>{
                    // if (elementE.position == slotsV.position) {
                    //     criatureE= new creatureCard(mazo.life,mazo.damage,mazo.mana,mazo.efect,mazo.id,mazo.dead,mazo.bouth)  
                    //     console.log(`se enfrentan ${criatureE.id} y ${playe.id}`)
                    //     criatureE.systemAtackPlayer(playe)
                    // }
                    // })
                })
            });
        }
        infCampE.forEach(elementE=>{
            slotsVoidA.forEach(slotsV=>{
                if (elementE.position == slotsV.position) {
                    criatureE= new creatureCard(mazo.life,mazo.damage,mazo.mana,mazo.efect,mazo.id,mazo.dead,mazo.bouth)  
                    console.log(`se enfrentan ${criatureE.id} y ${playe.id}`)
                    criatureE.systemAtackPlayer(playe)
                    p.life = playe.life;
                    lifeAct -= criatureE.damage;
                    player.children.item(2).innerHTML = lifeAct;
                    targets.push(['player',playe.dead])
                }
            })
        })
        console.log('FIN DEL TURNO...')
    }
    const compOfMurder = (targets)=>{
        targets.forEach(element=>{
            if(element[1] == 0){
                console.log(element)
                let aux = document.getElementById(`${element[0]}`);
                let child = aux.lastChild;
                if (child !== null) {
                    child.remove()
                }
            }
        })
    };
    posAtacks(infCampA,infCampE)
    compOfMurder(targets);
    posAtackEnemi(infCampE,infCampA)
    compOfMurder(targets);
}

export function faseDeBatalla(){
    buttonPas.addEventListener('click',e =>{
        let conterMana = [...mana.lastChild.childNodes].length;
        batallaEnProceso()
        numTurn++;
        turn.innerHTML = numTurn;
        numAtacks++;
        atacks.innerHTML = numAtacks;
        console.log(lifeAct)
        if(lifeAct < 0){
            console.log(gameOver.classList.add("gameOverL"))
            gameOver.style.display = 'flex'
            gameOver.innerHTML = 'You lose!!'
        }
        else if(lifeActEnemi < 0){
            console.log(gameOver.classList.add("gameOverW"))
            gameOver.style.display = 'flex'
            gameOver.innerHTML = 'You Win!!'
        }
        else if(lifeAct > 0){
            if(numTurn > 0 ){
                if(conterMana < 5){
                    mana.lastChild.appendChild(createMana())
                }
        }
        }
    })
    buttonAtack.addEventListener('click',e =>{
            console.log(targetInSlot(rowA).length)
            let conterMana = [...mana.lastChild.childNodes].length;
            batallaEnProceso()
            console.log(lifeActEnemi)
            numTurn++;
            turn.innerHTML = numTurn;
            numAtacks++;
            atacks.innerHTML = numAtacks;
            if(lifeAct < 0){
                console.log(gameOver.classList.add("gameOverL"))
                gameOver.style.display = 'flex'
                gameOver.innerHTML = 'You lose!!'
            }
            else if(lifeActEnemi < 0){
                console.log(gameOver.classList.add("gameOverW"))
                gameOver.style.display = 'flex'
                gameOver.innerHTML = 'You Win!!'
            }
            else if(lifeAct > 0){
                if(numTurn > 0 ){
                    if(conterMana < 5){
                        mana.lastChild.appendChild(createMana())
                    }
            }
            }
    })
}