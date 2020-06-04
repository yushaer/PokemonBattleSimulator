import React from 'react';
import Pokedex from 'pokedex-promise-v2'
import Form from 'react-bootstrap/Form'
import Pokemons from '../pokemon.json'

import Moves from '../Moves'
import Natures from '../natures.json'
import { connect } from 'react-redux';
import {addPokemon,changePokemon } from '../Actions/'
import Stats_Calculator from './Stats_Calculator'
import moves from '../moves.json';
import  '../../node_modules/jquery/dist/jquery'
import $ from '../../node_modules/jquery/'
import 'bootstrap/dist/js/bootstrap.min'


 import 'bootstrap-select/dist/js/bootstrap-select.min'
 import 'popper.js/dist/popper.min'
 import Teams from './Teams'
 import {
    BrowserRouter,
    Switch,
    Route,
    Link
  } from "react-router-dom";
 var Pokemon = require('../Pokemon');
class PokemonList extends React.Component{
    constructor(props){
        super(props);
        
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
        var test=new Pokemon(null,base_stats,
            pokemon.name,
            pokemon.moves,
            pokemon.types,
            pokemon.sprites,[],
            pokemon.abilities,pokemon.height,pokemon.weight)
        var id = (this.props.team.length-1)+1
        this.setState({...this.state,selected_poke:test}, () => {
        ;
        });
        
    }
    async addToTeam(){
        var id = (this.props.team.length-1)+1
        await this.props.dispatch(addPokemon({id:id,pokemon:this.state.selected_poke})) 
        
    }
    disp(){
        let pokemon=new Pokemon(this.props.team[0].pokemon)
        console.log(this.props.team[0].pokemon.test())
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
    $('.choose-pokemon').selectpicker();
    $(".bootstrap-select").click(function () {
        $(this).addClass("show");
        $('.choose-pokemon') .selectpicker('toggle');
   });
        await this.getPokemonsList();
    }
        
    
    render(){
        if(this.state.selected_poke!=null){
            console.log(this.state.selected_poke)
        }
     

        return(
            <section className="choose-pokemon">
            <Teams player_team={true}></Teams>
            <Link to="/pokemon-battler">Pokemon battler</Link>
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
             <select className="choose-pokemon form-control"   id="inputGroupSelect01"  data-style="sel" onChange={this.select_poke}  data-show-subtext="true" data-live-search="true">   
                <option selected>Choose pokemons</option>
                {Pokemons.map((item,idx)=>(<option key={idx} value={idx}>{item.name}</option>))}
            </select>
            </div>
            <br></br>
            {this.state.selected_poke?(
            <Stats_Calculator pokemon={this.state.selected_poke} update_states={this.updateStats} />):""}  
            <br></br>
            {this.state.selected_poke?(
            <Moves_Picker pokemon={this.state.selected_poke} update_states={this.updateStats}/>):""}
            <button className="btn btn-primary" onClick={(event)=>{
                let that=this;
                this.addToTeam().then(function(){
                  that.disp();
                })
            }
            }>Add Pokemon to Team</button>
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
        super(props);
        const sorted_moves= moves.sort(function(a, b) {
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
            })
        this.state={moves:sorted_moves,showpopover:false}
    }
    componentDidMount(){
     
    }
    binary_search(arr,l,r,x){
        if(r>=l){
            var mid=Math.floor((l+r)/2);
            console.log(x)
            if(arr[mid].name===x){
              
                return mid;
            }
            if(arr[mid].name>x){
                console.log("greater")
                return this.binary_search(arr,l,mid-1,x);

            }
            console.log("lower")
            return this.binary_search(arr,mid+1,r,x);

        }
        return -1;
    }
    find_moves(name,index){
        const idx=this.binary_search(this.state.moves,0,this.state.moves.length-1,name)
        let smove= this.state.moves[idx];
        let move=new Moves( 
            smove.name,
            smove.power,
            smove.pp,
            smove.priority,
            smove.stat_changes,
            smove.target,
           smove.type,
            smove.accuracy,
             smove.damage_class,
             smove.effect_chance,
            smove.effect_changes,
            smove.effect_entries, 
             smove.id,
            smove.meta);
            this.props.pokemon.setLearned_Moves(index,move)
            this.props.update_states();
        console.log(this.state.moves[idx])
    }
    onToggleOpen(value){
        if(this.state.showpopover==false){
            this.state.showpopover=true
            $('#move1').popover({
                container: 'body',
          
              })
        }
        else{
            this.state.showpopover=false;
            $("#move"+value).popover('dispose')
        }
    }
    render_move_selection(){
        let moves_selection=[1,2,3,4];
        return (moves_selection.map((value,idx)=>{
            return(
            <div className=" col-6 col-sm-12 col-md-6">
              
                <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <label className="input-group-text" htmlFor="inputGroupSelect01">Choose Move {value}</label>
                </div>
                    
                
                    
            
            
                        <select className="form-control"    id={"move"+value}  onChange={(event)=>{
                            this.find_moves(event.target.value,idx);
                        }}  data-show-subtext="true" data-live-search="true">   
                        <option   selected>Choose Moves</option>
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
                            }).map((item,idx)=>(<option    key={idx} value={item.name }>{item.name}</option>))}
                        </select>
                    
            
                    </div>
<br></br>
        </div>)
        })
        );
    }
    
    render(){
        return(
            <React.Fragment>
            <div className="row small-gutters">
                {this.render_move_selection()}
            </div>
            </React.Fragment>)
    }        
}