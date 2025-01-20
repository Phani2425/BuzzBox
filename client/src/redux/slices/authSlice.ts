import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    user : localStorage.getItem('User') ? JSON.parse(localStorage.getItem('User') as string) : null,
    admin: localStorage.getItem('Admin') ? localStorage.getItem('Admin') : false,
    token :localStorage.getItem('token') ? localStorage.getItem('token') as string : null,
    userNameSet: true
}


const authSlice = createSlice({

    name:'auth',
    initialState:initialState,
    reducers: {
        setUser : (state,action ) => {
            state.user = action.payload;
        },
        setToken : (state,action ) => {
            state.token = action.payload;
        },
        setAdmin : (state,action ) => {
            state.admin = action.payload;
        },
        setUserName: (state,action) => {
            state.userNameSet = action.payload;
        }
    }
    
})

export const {setUser,setAdmin,setToken,setUserName} = authSlice.actions;
export default authSlice.reducer;