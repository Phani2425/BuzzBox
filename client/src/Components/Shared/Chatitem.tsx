import React from 'react'
import { Link } from 'react-router-dom'

interface ChatitemProps {
    avatar: string[]
    name: string
    _id: string
    lastMessage: string,
    groupChat: boolean,
    sameSender: boolean,
    isOnline: boolean,
    newMessage: boolean,
    index: number,
    handleDeleteChatOpen: any
}

const Chatitem = ({
    avatar=[],
    name,
    _id,
    lastMessage,
    groupChat=false,
    sameSender,
    isOnline,
    newMessage,
    index=0,
    handleDeleteChatOpen
}) => {
  return (
    <div className='text-white p-[1rem]'>
        <div></div>
    </div>
  )
}

export default Chatitem