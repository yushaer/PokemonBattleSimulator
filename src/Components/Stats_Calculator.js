
import React from 'react';
import Pokedex from 'pokedex-promise-v2'
import Form from 'react-bootstrap/Form'
import Pokemons from '../pokemon.json'
import Pokemon from '../Pokemon'
import Natures from '../natures.json'
import { connect } from 'react-redux';
import {addPokemon,changePokemon } from '../Actions/'
import $ from 'jquery'
class Stats_Calculator extends React.Component{
    constructor(props){
        super(props)
        this.state={ ev:{hp:0,atk:0,spatk:0,def:0,spdef:0,spd:0},iv:{hp:0,atk:0,spatk:0,def:0,spdef:0,spd:0},level:1,nature:null,error:null}
        this.handleChange=this.handleChange.bind(this);
        this.updateStats=this.updateStats.bind(this)
        this.selectNature=this.selectNature.bind(this)
    }
    selectNature(e){
        var  nature=Natures[e.target.value];
        this.state.nature=nature;
        this.setState(nature)
       
      
     }
     componentDidMount(){
       
   ;
    }
    updateStats(e){
        e.preventDefault();
        var sum= 0;
        Object.keys(this.state.ev).forEach(key => {
            console.log(this.state.ev[key])
            sum+=this.state.ev[key]
        });
        
        console.log("sum " +sum)
        if(sum<=502){
            this.props.pokemon.setEV(this.state.ev)
            this.state.error="";
            this.setState(this.state)
        }
        else{
            this.state.error="No more then 502 ev points allowed plz decrases the amount of ev point you have allowed";
            this.setState(this.state)
        }

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
                    <p className="error" style={{color:"red"}}>{this.state.error}</p>
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
                <label className="input-group-text" htmlFor="inputGroupSelect01"> Choose Nature</label>
            </div>
           
             
                
                <select className=" form-control"    id="inputGroupSelect01"  onChange={this.selectNature } data-style="sel" data-show-subtext="true" data-live-search="true">
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
export default Stats_Calculator;