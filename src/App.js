import React from 'react';
import logo from './logo.svg';
import './App.css';
import Pokedex from 'pokedex-promise-v2'
import Container from 'react-bootstrap/Container'
import PokemonList from './Components/PokemonList'
import Pokemons from './pokemon.json'
import Router from './Components/Router'
class App extends React.Component{
  constructor(props){
    super(props);
    this.state={progress:0}
    
   // this.write_to_file=this.write_to_file.bind(this)
  }
 
  

  render(){
    console.log(Pokemons[0])
    return(
      <Router/>
  
    );
  }
}


export default App;
