import React from 'react'

const GroupAvatar = ({avatars} : {
    avatars: string[]
}) => {
  return (
    <div>
        <div className="flex">
            {avatars.map((avatar, index) => {
            return (
               
               <div className={`relative ${index > 0 ? '-ml-6' : 'ml-0'} `} >
                 <img
                key={index}
                    src={avatar}
                    alt="avatar"
                    className={`w-10 h-10 rounded-full border-2 border-white  `}
                />
               </div>
                
             
            )
            })}
        </div>
    </div>
  )
}

export default GroupAvatar