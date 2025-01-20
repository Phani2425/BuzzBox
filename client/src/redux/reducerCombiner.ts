import { combineReducers } from "redux";
import authReducer from './slices/authSlice'
import {api } from '@/redux/rtkQueryAPIs'


const reducer = combineReducers({
    'auth' : authReducer,
    [api.reducerPath]: api.reducer,
})

export default reducer;