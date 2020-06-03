
function write_to_file(name,obj){
    const fs = require('fs');
  

    // stringify JSON Object
    var jsonContent = JSON.stringify(obj);
    console.log(jsonContent);
    
    fs.writeFile( name+".json", jsonContent, 'utf8', function (err) {
        if (err) {
            console.log("An error occured while writing JSON Object to File.");
            return console.log(err);
        }
    
        console.log("JSON file has been saved.");
    });
  }
  


  module.exports.get_nature =async function() {
    var Pokemon = require('./Pokemon');
      console.log("hi")
       var  Pokedex= require( 'pokedex-promise-v2')
    var P = new Pokedex();
    var poke_list=[]
    var pokemons=[]

  await P.getNaturesList()
     .then(   async function(response) {
      poke_list=response.results;
        let count =0;
        let prog=0.00
        let prev_prog=0;
        for(var i in poke_list){
        
           prog=(count)/(poke_list.length)
        
console.log(prog)
      
           

          
          console.log(poke_list[i].name)
      await P.getNatureByName(poke_list[i].name)
          .then(function(response){
            //console.log(response)
            pokemons.push(response)
          })
          .catch(function(error) {
            console.log('There was an ERROR: ', error);
          });
          count+=1
          prev_prog=prog;
        }
       
    }).then(function(){
        var to_write=[]
        for(var i = 0; i < pokemons.length;i++){
            // var stats=pokemons[i].stats.map((item)=>{
            //   return {[item.stat.name]:item.base_stat}
            // })
            // var moves=pokemons[i].moves.map((item)=>{
            //   return item.move;
            // })
            var nature=pokemons[i]
           // console.log(nature.name)
          var add={name:nature.name,[nature.name]:{}}
          //{[nature.decreased_stat.name]:0.9,[nature.increased_stat.name]:1.1}
          if(nature.increased_stat!=null){
            add[nature.name][nature.increased_stat.name]=1.1
          }
          if(nature.decreased_stat!=null){
            add[nature.name][nature.decreased_stat.name]=0.9
          }
            
       
           to_write.push(add);
        }

         write_to_file("natures",to_write)
    })
   

 
   
  }
  
function write_to_file(name,obj){
  const fs = require('fs');


  // stringify JSON Object
  var jsonContent = JSON.stringify(obj);
  console.log(jsonContent);
  
  fs.writeFile( name+".json", jsonContent, 'utf8', function (err) {
      if (err) {
          console.log("An error occured while writing JSON Object to File.");
          return console.log(err);
      }
  
      console.log("JSON file has been saved.");
  });
}
module.exports.test =async function() {
  var Pokemon = require('./Pokemon');
    console.log("hi")
     var  Pokedex= require( 'pokedex-promise-v2')
  var P = new Pokedex();
  var poke_list=[]
  var pokemons=[]

await P.getPokemonsList()
   .then(   async function(response) {
    poke_list=response.results;
      let count =0;
      let prog=0.00
      let prev_prog=0;
      for(var i in poke_list){
      
         prog=(count)/(poke_list.length)
      
console.log(prog)
    
         

        
        //console.log(i)
    await P.getPokemonByName(poke_list[i].name)
        .then(function(response){
          //console.log(response)
          pokemons.push(response)
        })
        .catch(function(error) {
          console.log('There was an ERROR: ', error);
        });
        count+=1
        prev_prog=prog;
      }
     
  }).then(function(){
      var to_write=[]
      for(var i = 0; i < pokemons.length;i++){
          var stats=pokemons[i].stats.map((item)=>{
            return {[item.stat.name]:item.base_stat}
          })
          var moves=pokemons[i].moves.map((item)=>{
            return item.move;
          })
          pokemons[i].sprites.animated_front="http://play.pokemonshowdown.com/sprites/xyani/"+pokemons[i].name+".gif";
         pokemon=new Pokemon(stats,pokemons[i].name,moves,pokemons[i].types,pokemons[i].sprites,[],pokemons[i].abilities,pokemons[i].height,pokemons[i].weight);
         to_write.push(pokemon);
      }

       write_to_file("pokemon",to_write)
  })
 


  P.getPokemonByName('eevee') // with Promise
  .then(function(response) {
    console.log(response);
  })
  .catch(function(error) {
    console.log('There was an ERROR: ', error);
  });
  P.getMoveByName("tackle")
  .then(function(response) {
    console.log(response);
  })
}


module.exports.get_Moves =async function() {
  //var Pokemon = require('./Pokemon');
    console.log("hi")
     var  Pokedex= require( 'pokedex-promise-v2')
  var P = new Pokedex();
  var poke_list=[]
  var pokemons=[]

await P.getMovesList()
   .then(   async function(response) {
    poke_list=response.results;
      let count =0;
      let prog=0.00
      let prev_prog=0;
      for(var i in poke_list){
      
         prog=(count)/(poke_list.length)
      
console.log(prog)
    
         

        
      //  console.log(poke_list[i])
    await P.getMoveByName(poke_list[i].name)
        .then(function(response){
          //console.log(response)
          pokemons.push(response)
        })
        .catch(function(error) {
          console.log('There was an ERROR: ', error);
        });
        count+=1
        prev_prog=prog;
      }
     
  }).then(function(){
      var to_write=[]
      for(var i = 0; i < pokemons.length;i++){
          // var stats=pokemons[i].stats.map((item)=>{
          //   return {[item.stat.name]:item.base_stat}
          // })
          // var moves=pokemons[i].moves.map((item)=>{
          //   return item.move;
          // })
          var moves=pokemons[i]
        
          var move={}
          move.name=moves.name;
        move.power=moves.power!=null?moves.power:0
        move.pp=moves.pp;
        move.priority=moves.priority;
        move.stat_changes=moves.stat_changes;
        move.target=moves.target;
        move.type=moves.type;
          move.accuracy= moves.accuracy!=null?moves.accuracy:100
          move.damage_class=moves.damage_class;
          move.effect_chance=moves.effect_chance;
          move.effect_changes=moves.effect_changes;
          move.effect_entries=moves.effect_entries;
          move.id=moves.id;
          move.meta=moves.meta;
          
        
         to_write.push(move);
      }
      console.log(to_write[10])
       write_to_file("moves",to_write)
  })
 


 
}