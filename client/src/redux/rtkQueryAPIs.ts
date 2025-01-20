import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react';
const ServerURL = import.meta.env.VITE_SERVER_URL;
const token = localStorage.getItem('token');
export const api = createApi({
    reducerPath:"api",
    baseQuery:fetchBaseQuery({baseUrl:`${ServerURL}/api/v1/`, credentials:'include'}),
    tagTypes:["Chat"],
    endpoints:(builder) => ({
        myChats:builder.query({
            query:() => ({
                url:'chat/mychats',
                headers:{
                    "content-type":"application/json",
                    "Authorization":`Bearer ${token}`
                }
               
                
            }),
            providesTags:["Chat"]
        }),

        searchUsers:builder.query({
            query:(userName) => ({
                url:`user/search?name=${userName}`,
                headers:{
                    "content-Type":"application/json",
                    "Authorization":`Bearer ${token}`
                }
            })
        })
    })

})

export const {useMyChatsQuery, useLazySearchUsersQuery} = api;