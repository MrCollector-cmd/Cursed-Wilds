export class creatureCard{
    constructor(life,damage,mana,efect,id,dead,bouth){
        this.life = life;
        this.damage = damage;
        this.efect = efect;
        this.id = id;
        this.dead = dead;
        this.mana = mana;
        this.bouth = bouth;
    }
    // pedido de stats
    get stats(){
        return [this.life,this.damage,this.efect,this.id,this.dead,this.bouth];
    }
    systemAtack(oponent){
        if(oponent.damage == this.life && oponent.life == this.damage){
            console.log('Empate')
            this.dead = 0;
            oponent.dead = 0;
        }else if(oponent.life <= this.damage && (oponent.damage < this.life || oponent.damage > this.life) !== false){
            console.log('Gane')
            if(oponent.damage > this.life){
                this.dead = 0;
            }
            oponent.dead = 0;
        }else if(oponent.life > this.damage && oponent.damage >= this.life){
            console.log('Perdi')
        }else console.log('No atacan')
    }
    systemAtackPlayer(oponent){
        console.log('Perdiste vida',this.damage)
        oponent.life -= this.damage;
    }
}
export class spellCard{
    constructor(efect){
        this.efect = efect;
    }
    get infoEfect(){
        return this.efect;
    }
}