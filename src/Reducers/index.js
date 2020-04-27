import {combineReducers} from 'redux';
import teamReducer from  './Team_Reducer';
// import SessionReducer from  './SessionReducer';
// import MessageReducer from './Message_Reducer';
const reducer = combineReducers({
team:teamReducer
});
export default reducer;