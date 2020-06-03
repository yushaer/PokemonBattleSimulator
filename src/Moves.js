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
        
         

}