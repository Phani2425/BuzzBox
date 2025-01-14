import React from 'react'

const AvatarCard = ({avatar = []} : {avatar:string[]}) => {
  return (
    <div>
        <div className='bg-white w-11 h-11 rounded-full overflow-hidden flex items-center   justify-center'>
        <img className='h-10 w-10 rounded-full' src={avatar[0]} alt="" />
        </div>
    </div>
  )
}

export default AvatarCard