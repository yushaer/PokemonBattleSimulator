import React from 'react';
 
 
import Pokedex from 'pokedex-promise-v2'
import Container from 'react-bootstrap/Container'
import PokemonList from '../Components/PokemonList'
import Teams from '../Components/Teams'
import Pokemons from '.././pokemon.json'
class PokemonBattler extends React.Component{
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
      <h1 className="text-center">Pokemon battle simulator</h1>
      <div className="container shadow my-5 bg-light rounded ">
     <div className="row">
        <div className="col-lg-6 col-md-6 col-sm-12">
        <Teams player_team={true}></Teams>
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12"></div>
     
     </div>
     
      <br></br>
      <br></br>
      </div>
      
      
      </React.Fragment>
  
    );
  }
}
export default PokemonBattler