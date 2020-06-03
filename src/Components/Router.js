import React from "react";
import {
  BrowserRouter,
  Switch,
  Route,
  Link
} from "react-router-dom";
import TeamBuilder from '../team-builder/TeamBuilder'
export default function Router(){
    return(
        <BrowserRouter>
        <Switch>
        <Route exact path='/team-builder' component={TeamBuilder} />
    
    </Switch>

        </BrowserRouter>
    )
}