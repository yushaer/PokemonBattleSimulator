import React from 'react';
import Pokedex from 'pokedex-promise-v2'
import Form from 'react-bootstrap/Form'
import Pokemons from '../pokemon.json'
import Pokemon from '../Pokemon'
import Natures from '../natures.json'
import { connect } from 'react-redux';
import {addPokemon,changePokemon } from '../Actions/'
import Stats_Calculator from './Stats_Calculator'
import moves from '../moves.json'
 

class PokemonList extends React.Component{
    constructor(props){
        super(props)
        this.state={pokelist:[],selected_poke:null}
        this.getPokemonsList=this.getPokemonsList.bind(this)
        this.select_poke=this.select_poke.bind(this)
        this.updateStats=this.updateStats.bind(this)
    }
    updateStats(){
        this.setState(this.state)
    }
    select_poke(e){
       var  pokemon=Pokemons[e.target.value];
      var base_stats={hp:pokemon.base_stats[5].hp,
        attack:pokemon.base_stats[4].attack,
        'special_attack':pokemon.base_stats[2]['special-attack'],
        'defense':pokemon.base_stats[3].defense,
        'special_defense':pokemon.base_stats[1]['special-defense'] ,
        'speed':pokemon.base_stats[0].speed
    }
        var test=new Pokemon(base_stats,
            pokemon.name,
            pokemon.moves,
            pokemon.types,
            pokemon.sprites,
            pokemon.abilities)
        var id = (this.props.team.length-1)+1
        this.setState({...this.state,selected_poke:test}, () => {
            this.props.dispatch(addPokemon({id:id,pokemon:this.state.selected_poke}));
        });
        
    }
    async getPokemonsList(){
        var P = new Pokedex();
        var poke_list=[]
        var pokemons=[]
        const that =this
      await P.getPokemonsList()
         .then(   async function(response) {
          poke_list=response.results;
          that.state.pokelist=poke_list;
          
            that.setState(that.state)
           
        })
    }
   async componentDidMount(){
        await this.getPokemonsList();
    }
        
    
    render(){
        if(this.state.selected_poke!=null){
            console.log(this.state.selected_poke)
        }
     

        return(
            <section className="choose-pokemon">
            <h2 className="text-center">Pokemon Select</h2>
            <div className="row no-gutters align-center d-flex justify-content-center">
            
                <div className="col-sm-6 col-md-6">
                    <div className="pokemon-pic">
                    {this.state.selected_poke?(<img className=" poke-pic img-thumbnail rounded mx-auto d-block" src={this.state.selected_poke.sprites.animated_front}/>):""}
                    </div>
                </div>
                <div className="col-sm-6 col-md-6">
                {this.state.selected_poke?(
                    <div className="pokemon-stats border border-primary rounded-lg">
                    <h3 className="text-center">Stats</h3>
                    <span>Types: 
                    {this.state.selected_poke?this.state.selected_poke.types.map((item)=>{
                        return item.type.name +", ";
                      }) : ""
                     } 
                    </span>  
                    {this.state.selected_poke?Object.keys(this.state.selected_poke.actual_stats   ).map((key)=>{
                       return (<React.Fragment><br></br><span>{key}:{this.state.selected_poke.actual_stats[key]}</span></React.Fragment>)
                     }) : ""
                    }   
                    </div>):""}     
                </div>
            </div>
            <br></br>
            <div className="input-group mb-3">
            <div className="input-group-prepend">
                <label className="input-group-text" htmlFor="inputGroupSelect01">Choose pokemon</label>
            </div>
             <select className="selectpicker form-control"   id="inputGroupSelect01"  data-style="sel" onChange={this.select_poke}  data-show-subtext="true" data-live-search="true">   
                <option selected>Choose pokemons</option>
                {Pokemons.map((item,idx)=>(<option key={idx} value={idx}>{item.name}</option>))}
            </select>
            </div>
            <br></br>
            {this.state.selected_poke?(
            <Stats_Calculator pokemon={this.state.selected_poke} update_states={this.updateStats} />):""}  
            <br></br>
            {this.state.selected_poke?(
            <Moves_Picker pokemon={this.state.selected_poke}/>):""}
            </section>
      
        )
    }
}
function mapStateToProps(state) {
    // console.log(state)
     return state;
   }
 export default connect(mapStateToProps)(PokemonList)
class Moves_Picker extends React.Component{
    constructor(props){
        super(props)
    }
    
    render(){
        return(
            <React.Fragment>
            <div className="row small-gutters">
                <div className=" col-6 col-sm-12 col-md-6">
              
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                              <label className="input-group-text" htmlFor="inputGroupSelect01">Choose Move 1</label>
                                
                            </div>
                        <select className="form-control"   id="inputGroupSelect02"    data-show-subtext="true" data-live-search="true">   
                        <option selected>Choose Moves</option>
                        {this.props.pokemon.moves.map((item,idx)=>(<option key={idx} value={idx}>{item.name}</option>))}
                        </select>
                        </div>
                
            

                </div>
                <div className=" col-6 col-sm-12 col-md-6">
              
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                              <label className="input-group-text" htmlFor="inputGroupSelect01">Choose Move 2</label>
                                
                            </div>
                        <select className="form-control"   id="inputGroupSelect02"    data-show-subtext="true" data-live-search="true">   
                        <option selected>Choose Moves</option>
                        {this.props.pokemon.moves.map((item,idx)=>(<option key={idx} value={idx}>{item.name}</option>))}
                        </select>
                        </div>
                
            

                </div>
            </div>
            <div className="row small-gutters">
                <div className="col-6 col-sm-12 col-md-6">
              
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                              <label className="input-group-text" htmlFor="inputGroupSelect01">Choose Move 3</label>
                                
                            </div>
                        <select className="form-control"   id="inputGroupSelect02"    data-show-subtext="true" data-live-search="true">   
                        <option selected>Choose Moves</option>
                        {this.props.pokemon.moves.map((item,idx)=>(<option key={idx} value={idx}>{item.name}</option>))}
                        </select>
                        </div>
                
            

                </div>
                <div className="col-6 col-sm-12 col-md-6">
              
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                              <label className="input-group-text" htmlFor="inputGroupSelect01">Choose Move 4</label>
                                
                            </div>
                        <select className="form-control"   id="inputGroupSelect02"    data-show-subtext="true" data-live-search="true">   
                        <option selected>Choose Moves</option>
                        {this.props.pokemon.moves.sort(function(a, b) {
                                var nameA = a.name.toUpperCase(); // ignore upper and lowercase
                                var nameB = b.name.toUpperCase(); // ignore upper and lowercase
                                if (nameA < nameB) {
                                    return -1;
                                }
                                if (nameA > nameB) {
                                    return 1;
                                }

                                // names must be equal
                                return 0;
                                }).map((item,idx)=>(<option key={idx} value={idx}>{item.name}</option>))}
                        </select>
                        </div>
                
            

                </div>
            </div>
            </React.Fragment>)
    }        
}