import { combineReducers } from "redux";
import authReducer from './slices/authSlice'

const reducer = combineReducers({
    'auth' : authReducer
})

export default reducer;