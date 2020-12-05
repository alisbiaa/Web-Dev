import {gameGenerator} from "./gameGenerator.js";
import {playersManager} from "./playersManager.js";

const start  = document.querySelector("#start") ;
window.addEventListener("load", e => new playersManager());
start.addEventListener("click" , e=> new gameGenerator() );
start.addEventListener("click", e => new playersManager().createPlayers());

// const trybutton = document.getElementById("trying");
// trybutton.addEventListener("click", e => new playersManager().render());
