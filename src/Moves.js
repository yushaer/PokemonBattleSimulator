export default class Moves{
    name;
    power;
    pp;
    priority;
    stat_changes;
    target;
    type;
    accuracy;
    damage_class;
    effect_chance;
        effect_changes;
          effect_entries;
        id;
         meta;
         constructor( name,power,pp,priority,stat_changes,target,type,accuracy, damage_class,effect_chance,effect_changes,effect_entries, id,meta){
            this.name=name;
            this.power=power!=null?power:0
            this.pp=pp;
            this.priority=priority;
            this.stat_changes=stat_changes;
            this.target=target;
            this.type=type;
            this.accuracy= accuracy!=null?accuracy:100
            this.damage_class=damage_class;
            this.effect_chance=effect_chance;
            this.effect_changes=effect_changes;
            this.effect_entries=effect_entries;
            this.id=id;
            this.meta=meta;


         }
         constructor(moves){
            this.name=moves.name;
            this.power=moves.power;
            this.pp=moves.pp;
            this.priority=moves.priority;
            this.stat_changes=moves.stat_changes;
            this.target=moves.target;
            this.type=moves.type;
            this.accuracy= moves.accuracy
            this.damage_class=moves.damage_class;
            this.effect_chance=moves.effect_chance;
            this.effect_changes=moves.effect_changes;
            this.effect_entries=moves.effect_entries;
            this.id=moves.id;
            this.meta=moves.meta;


         }
         

}