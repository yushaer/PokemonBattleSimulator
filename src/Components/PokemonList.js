import React from 'react';
import Pokedex from 'pokedex-promise-v2'
import Form from 'react-bootstrap/Form'
import Pokemons from '../pokemon.json'
import Pokemon from '../Pokemon'
import Natures from '../natures.json'
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
      
        this.setState({...this.state,selected_poke:test})
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
            </section>
      
        )
    }
}
export default PokemonList;
class Stats_Calculator extends React.Component{
    constructor(props){
        super(props)
        this.state={ ev:{hp:0,atk:0,spatk:0,def:0,spdef:0,spd:0},iv:{hp:0,atk:0,spatk:0,def:0,spdef:0,spd:0},level:1,nature:null}
        this.handleChange=this.handleChange.bind(this);
        this.updateStats=this.updateStats.bind(this)
        this.selectNature=this.selectNature.bind(this)
    }
    selectNature(e){
        var  nature=Natures[e.target.value];
        this.state.nature=nature;
        this.setState(nature)
       
      
     }
    updateStats(e){
        e.preventDefault();
        this.props.pokemon.setEV(this.state.ev)
        this.props.pokemon.setIV(this.state.iv)
        this.props.pokemon.setLevel(this.state.level)
        this.props.pokemon.setNature(this.state.nature);
        console.log(this.props.pokemon.nature)
        this.props.pokemon.calculate_stats()
        //console.log(this.props.pokemon.actual_stats)
        this.props.update_states();
    }
    handleChange(is_ev,e,stat){
        if(is_ev){
            if(e.target.value<0){
                e.target.value=0;
            }
            if(e.target.value>255){
                e.target.value=255;
            }
            if(!isNaN(parseInt(e.target.value))){
                this.state.ev[stat]=parseInt(e.target.value);
            this.setState(this.state)
            }
            
        }
        else{
            if(e.target.value<0){
                e.target.value=0;
            }
            if(e.target.value>31){
                e.target.value=31;
            }
            this.state.iv[stat]=parseInt(e.target.value);
            this.setState(this.state)
        }
        //console.log(this.state)
    }
    render_state_change_input(is_ev,modifier){
        let min=0;
        let max=is_ev?255:31
        let id=is_ev?"ev":"iv"
        return (
            Object.keys(this.state[modifier]).map((key)=>{
                return (  <div className="col-sm-12 col-md-6">
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <label className="input-group-text" htmlFor="inputGroupSelect01">{key}</label>
                    </div>
            
                    <input type="number" min="0" max={max} onChange={(event)=>{this.handleChange(is_ev,event,key)
                    }} class="form-control" id={key +"-" +id}>
                    </input>
                </div>
            
            </div>)
            })
        )
    }
    render(){
        return(
            <React.Fragment>
            <div className="row small-gutters">
                <div className="col-sm-4">
                    <h3 className="text-center" >EV</h3>
                    <div className="row">
                        {this.render_state_change_input(true,"ev")}
                     </div> 
                </div>
                <div className="col-sm-4">
                <h3 className="text-center" >IV</h3>
                <div className="row">    
                {this.render_state_change_input(false,"iv")}
                 </div>      
            </div>
            <div className="col-sm-4">
            <br></br><br></br>
                <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <label className="input-group-text" htmlFor="inputGroupSelect01">Level</label>
                </div>
                <input type="number" min="1" max="100" onChange={(e)=>{
                   if(e.target.value>100){
                       e.target.value=100
                   }
                   else if(e.target.value<1){
                       e.target.value=1;
                   }
                   if(!isNaN(parseInt(e.target.value))){
                    this.state.level=parseInt(e.target.value);
                this.setState(this.state)
                }

                }} class="form-control" id="level" >
                </input>
            </div>
            <br>
            </br>
            <div className="input-group mb-3">
            <div className="input-group-prepend">
                <label className="input-group-text" htmlFor="inputGroupSelect01">Choose nature</label>
            </div>
            <select className=" form-control"   id="inputGroupSelect01"  onChange={this.selectNature } data-style="sel" data-show-subtext="true" data-live-search="true">
                <option selected>Choose Nature</option>
                {Natures.map((item,idx)=>(<option key={idx} value={idx}>{item.name}</option>))}
            </select>
            </div> 
            </div>
            </div>
            <div class="row justify-content-center">
  <button type="submit" class="btn btn-primary" onClick={(event)=>this.updateStats(event)}>Calculate stats</button>
</div>
            </React.Fragment>
        )
    }
}