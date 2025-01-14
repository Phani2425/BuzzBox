import React, { memo } from 'react'
import { Link } from 'react-router-dom'
import { ChatitemProps } from '@/Types/types'
import AvatarCard from './AvatarCard'


const Chatitem : React.FC<ChatitemProps> = ({
    avatar=[],
    name,
    _id,
    lastMessage,
    groupChat=false,
    sameSender,
    isOnline,
    newMessageAlert,
    index=0,
    handleDeleteChat
}) => {


  return (
    <Link to={`/chat/${_id}`} onContextMenu={(e) => handleDeleteChat(e, _id, groupChat)} className='flex flex-col gap-[1rem] '  >

      <div className={`flex p-[1rem] gap-[1rem] alignItems-center  ${sameSender ? "bg-black text-white hover:bg-black/80": "bg-white text-black hover:bg-white/80"} relative `}>

        <AvatarCard avatar={avatar} />

        <div>
          <p>{name}</p>
          {
            newMessageAlert && (
              <p>{newMessageAlert.count} New Messages</p>
            )
          }
        </div>

        {
          isOnline && (
            <div className='w-3 h-3 rounded-full bg-green-500 absolute top-[50%] right-4 -translate-y-1/2'></div>
          )
        }

        

      </div>

    </Link>
  )
}

export default memo(Chatitem);