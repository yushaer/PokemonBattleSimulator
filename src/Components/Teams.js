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
 var Pokemon = require('../Pokemon');
 class Teams extends React.Component{

  constructor(props){
        super(props);
        
        this.state={pokelist:[],selected_poke:null}
        
    }
    render(){
        if(this.props.player_team){
            return(
                <React.Fragment>
                    <h3 >Player Team</h3>
                    <div class="d-flex flex-row bg-secondary mb-3">
                    {this.props.team.map((item)=>{
                    return( <div class="p-2 "><img  style={{"maxWidth":"40px"}} src={item.pokemon.sprites.animated_front}  ></img></div>)
                    })
                        
                    }
                    
                    </div>
                    </React.Fragment>
            )
        }
        else{
           return(
               ""
           ) 
        }
    }

}
function mapStateToProps(state) {
    // console.log(state)
     return state;
   }
 export default connect(mapStateToProps)(Teams)