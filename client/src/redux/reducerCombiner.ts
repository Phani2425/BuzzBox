import { combineReducers } from "redux";
import authReducer from './slices/authSlice'
import chatReducer from './slices/chatSlice'
import {api } from '@/redux/rtkQueryAPIs'


const reducer = combineReducers({
    'auth' : authReducer,
    'chat': chatReducer,
    [api.reducerPath]: api.reducer,
})

export default reducer;