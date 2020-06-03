import React from 'react';
 
 
import Pokedex from 'pokedex-promise-v2'
import Container from 'react-bootstrap/Container'
import PokemonList from '../Components/PokemonList'
import Pokemons from '.././pokemon.json'
class TeamBuilder extends React.Component{
  constructor(props){
    super(props);
    this.state={progress:0}
    this.test=this.test.bind(this)
   // this.write_to_file=this.write_to_file.bind(this)
  }
 
   async test(){
    var P = new Pokedex();
    var poke_list=[]
    var pokemons=[]
    const that =this
  await P.getPokemonsList()
     .then(   async function(response) {
      poke_list=response.results;
        let count =0;
        let prog=0.00
        let prev_prog=0;
        
       
    }).then(function(){
         //that.write_to_file("pokemon",pokemons)
    })
   

 
   
  }

  render(){
    console.log(Pokemons[0])
    return(
      <React.Fragment>
      <h1 className="text-center">pokemon battle simulator</h1>
      <div className="container ">
      <div class="card border-0 shadow my-5 bg-light rounded">
      <div class="card-body p-5">
      <PokemonList/>
      
      </div>
      
      </div>
    
  </div>
      </React.Fragment>
  
    );
  }
}
export default TeamBuilder