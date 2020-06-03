  class Pokemon{
        height;
        weight;
  
        base_stats={hp:null,attack:null,'special_attack':null,'defense':null,'special_defense':null,'speed':null};
        actual_stats={hp:null,attack:null,'special_attack':null,'defense':null,'special_defense':null,'speed':null}
        ev={hp:0,atk:0,spatk:0,def:0,spdef:0,spd:0}
        iv={hp:0,atk:0,spatk:0,def:0,spdef:0,spd:0}
        nature={"name":"hardy","hardy":{}};
        name;
        learned_moves;
        moves;
        types;
        sprites;
        abilities;
        level;
       
    constructor(pokemon,stats,name,moves,types,sprites,held_items,abilities,height,weight){
        if(pokemon!=null){
            this.base_stats=pokemon.base_stats;
            this.height=pokemon.height;
            this.weight=pokemon.weight;
          //  this.actual_stats=this.base_stats;
            this.name=pokemon.name;
            this.moves=pokemon.moves;
            this.types=pokemon.types;
            this.sprites=pokemon.sprites;
            this.abilities=pokemon.abilities;
            this.level=pokemon.level;
            this.ev=pokemon.ev;
            this.iv=pokemon.iv;
            this.nature=pokemon.nature;
            this.calculate_stats();
            this.learned_moves=pokemon.learned_moves;
            
        }
        else{
            this.base_stats=stats;
            this.height=height;
            this.weight=weight;
          //  this.actual_stats=this.base_stats;
            this.name=name;
            this.moves=moves;
            this.types=types;
            this.sprites=sprites;
            this.abilities=abilities;
            this.level=1;
            this.calculate_stats();
            this.learned_moves=[null,null,null,null]
        }
       
    }
    calculate_HP(){
        var upper=(2*this.base_stats.hp+this.iv.hp+Math.floor(this.ev.hp/4))*this.level
        var hp =Math.floor(upper/100)+this.level+10;
        this.actual_stats.hp=hp;
    }

    calculate_stat(base_stat,ev,iv,level,nature){
        var upper=(2*base_stat+iv+Math.floor(ev/4))*level
        var stat=Math.floor((Math.floor(upper/100)+5)*nature)
        return stat;
    }
    calculate_stats(){
        let{hp,attack,special_attack,defense,special_defense,speed}=this.base_stats;
        this.calculate_HP();
        var nature;
        var atk_n,spatk_n,def_n,spdef_n,spd_n=1;
        if(this.nature[this.nature.name]){
            atk_n=this.nature[this.nature.name].attack?this.nature[this.nature.name].attack:1
            spatk_n=this.nature[this.nature.name]['special-attack']?this.nature[this.nature.name]['special-attack']:1
            def_n=this.nature[this.nature.name].defense?this.nature[this.nature.name].defense:1
            spdef_n=this.nature[this.nature.name]['special-defense']?this.nature[this.nature.name]['special-defense']:1
            spd_n=this.nature[this.nature.name].speed?this.nature[this.nature.name].speed:1
        }
        this.actual_stats.attack=this.calculate_stat(attack,this.ev.atk,this.iv.atk,this.level,atk_n)
        this.actual_stats.special_attack=this.calculate_stat(special_attack,this.ev.spatk,this.iv.spatk,this.level,spatk_n)
        this.actual_stats.defense=this.calculate_stat(defense,this.ev.def,this.iv.def,this.level,def_n)
        this.actual_stats.special_defense=this.calculate_stat(special_defense,this.ev.spdef,this.iv.spdef,this.level,spdef_n)
        this.actual_stats.speed=this.calculate_stat(speed,this.ev.spd,this.iv.spd,this.level,spd_n)
        console.log(this.actual_stats)
    }
    
    setLearned_Moves(idx,move){
        this.learned_moves[idx]=move;
    }
    setEV(ev){
        this.ev=ev
    }
    setIV(iv){
        this.iv=iv
    }
    setNature(nature){
        this.nature=nature;
    }
    setLevel(level){
        this.level=level;
    }
    test(){
        return "test"
    }
    
}
module.exports=Pokemon