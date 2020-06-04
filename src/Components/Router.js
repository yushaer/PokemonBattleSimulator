import React from "react";
import {
  BrowserRouter,
  Switch,
  Route,
  Link
} from "react-router-dom";
import TeamBuilder from '../team-builder/TeamBuilder'
import PokemonBattler from '../pokemon-battler/PokemonBattler'
export default function Router(){
    return(
        <BrowserRouter>
        <Switch>
        <Route exact path='/team-builder' component={TeamBuilder} />
        <Route exact path='/pokemon-battler' component={PokemonBattler} />
    </Switch>

        </BrowserRouter>
    )
}