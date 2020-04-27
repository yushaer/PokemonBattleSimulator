const initalState=[]
function teamReducer(state=initalState,action){
    switch (action.type) {
        case 'addPokemon':
            return  [...state,action.payload]
            break;
        case 'changePokemon':
           return(

            state.map(item=>{
                if(item.id==action.payload.id){
                   return [...item,action.payload]
                }
                return item;
            })
           )
           
            break;
    
        default:
            return state;
            break;
    }
}
export default teamReducer