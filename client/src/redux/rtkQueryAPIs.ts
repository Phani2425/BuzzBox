import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const ServerURL = import.meta.env.VITE_SERVER_URL;
const token = localStorage.getItem("token");
export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${ServerURL}/api/v1/`,
    credentials: "include",
  }),
  tagTypes: ["Chat", "User", "Requests", "Group"],
  endpoints: (builder) => ({
    myChats: builder.query({
      query: () => ({
        url: "chat/mychats",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["Chat"],
    }),

    searchUsers: builder.query({
      query: (userName) => ({
        url: `user/search?name=${userName}`,
        headers: {
          "content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["User"],
    }),

    sendFriendRequest: builder.mutation({
      query: (userId) => ({
        method: "POST",
        url: "user/sendrequest",
        body: {
          receiverId: userId,
        },
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["User", "Requests"],
    }),

    getRequests: builder.query({
      query: () => ({
        url: "user/getrequests",
        headers: {
          "content-Type": "applicatioon/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["Requests"],
    }),

    acceptFriendRequest: builder.mutation({
      query: (requestId) => ({
        method: "POST",
        url: "user/acceptrequest",
        body: {
          requestId,
        },
        headers: {
          "content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["Requests","Chat","User"],
    }),

    rejectFriendRequest: builder.mutation({
      query: (requestId) => ({
        method: "POST",
        url: "user/rejectrequest",
        body: {
          requestId,
        },
        headers: {
          "content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["Requests","Chat","User"],
    }),

    createGroup: builder.mutation({
      query: (bodyData) => ({
        method: "POST",
        url: "chat/newgroup",
        body:{
         ...bodyData
        },
        headers: {
          "content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["Chat"],
    }),

    getMyFriends: builder.query({
      query: () => ({
        url: "user/getmyfriends",
        headers: {
          "content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      
    }),


    getAllGroup:builder.query({
      query:() => ({
        url: "chat/getallgroups",
        headers: {
          "content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        providesTags:['Group']
      })
    }),

    renameGroup: builder.mutation({
      query: (bodyData) => ({

        url:`chat/${bodyData.chatId}`,
        method:'PUT',
        body:{name:bodyData.name},
        headers:{
          'content-Type':'application/json',
          'Authorization':`Bearer ${token}`
        }

      }),
      invalidatesTags:['Chat','Group']
    }),

    leaveGroup: builder.mutation({
      query:(chatId) => ({
        url:`chat/leavegroup/${chatId}`,
        method:'DELETE',
        headers:{
          'content-Type':'application/json',
          'Authorization':`Bearer ${token}`
        }
      }),
      invalidatesTags:['Chat','Group']
    }),

    addMembers:builder.mutation({
      query:(bodyData) => ({
        url:'chat/addmember',
        method:'PUT',
        body:bodyData,
        headers:{
          'content-Type':'application/json',
          'Authorization':`Bearer ${token}`
        }
      }),
      invalidatesTags:['Chat','Group']
    }),

    removeMembers:builder.mutation({
      query:(bodyData) => ({
        url:'chat/removemember',
        method:'PUT',
        body:bodyData,
        headers:{
          'content-Type':'application/json',
          'Authorization':`Bearer ${token}`
        }
      }),
      invalidatesTags:['Chat','Group']
    }),
    
    deleteGroup:builder.mutation({
      query:(chatId) => ({
        url:`chat/${chatId}`,
        method:'DELETE',
        headers:{
          'content-Type':'application/json',
          'Authorization':`Bearer ${token}`
        }
      }),
      invalidatesTags:['Chat','Group']
    }),


    chatDetails:builder.query({
      query:(id,populate=false) => ({
        url: `chat/${id}?populate=${populate}`,
        headers: {
          "content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }
      
      })
    }),

    getMessages:builder.query({
      query:({ id, page }) => ({
        url: `messages/${id}?page=${page}`,
        headers: {
          "content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }
      
      })
    }),

    getUnreadMessages:builder.query({
      query:() => ({
        url: `chat/getunreadmessages`,
        headers: {
          "content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }
      
      })
    }),

    sendAttachments:builder.mutation({
      query:(formData) => ({
        url:"/message",
        method:'POST',
        body:formData,
        headers: {
          Authorization: `Bearer ${token}`,
        }
      
      })
    })

  })
});

export const {
  useMyChatsQuery,
  useLazyMyChatsQuery,
  useLazySearchUsersQuery,
  useSendFriendRequestMutation,
  useLazyGetRequestsQuery,
  useAcceptFriendRequestMutation,
  useRejectFriendRequestMutation,
  useCreateGroupMutation,
  useLazyGetMyFriendsQuery,
  useGetAllGroupQuery,
  useAddMembersMutation,
  useRemoveMembersMutation,
  useLeaveGroupMutation,
  useDeleteGroupMutation,
  useRenameGroupMutation,
  useLazyChatDetailsQuery,
  useLazyGetMessagesQuery,
  useLazyGetUnreadMessagesQuery,
  useSendAttachmentsMutation
} = api;
