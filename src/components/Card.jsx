import React from 'react';
import {MdDeleteOutline} from "react-icons/md"
import {FiEdit} from "react-icons/fi"

const Card = ({id, name, url, author, published_date, handleDelete, handleEdit}) => {
  return (
    <div className='rounded-xl uiBox2 group relative card p-0 w-[220px] h-[180px] flex justify-center items-center'>
      <div className='w-[160px] h-[160px] rounded-full object-cover bg-green-700 flex justify-center items-center text-7xl text-white font-bold'>{name[0]}</div>
      <div className='group-hover:flex flex-col max-h-[94.5%] hidden absolute bottom-0 left-0 right-0 bg-[#10131f82] m-2 p-4 rounded-md'>
        <p className='text-l font-bold text-white overflow-y-auto prompt'>{name}</p>
        <p className='text-sm text-white overflow-y-auto prompt'>{url}</p>
        <p className='text-sm text-white overflow-y-auto prompt'>{published_date}</p>
        <div className='mt-5 flex justify-between items-center gap-2'>
          <div className='flex items-center gap-2'>
            <div className='w-7 h-7 rounded-full object-cover bg-green-700 flex justify-center items-center text-xs text-white font-bold'>
              {author[0]}
            </div>
            <p className='text-white text-sm'>{author}</p>
          </div>
          <button type="button"   className="outline-none bg-transparent border-none">
            <MdDeleteOutline id={id} onClick={handleDelete} size={22}/>
          </button>
          <button type="button"  className="outline-none bg-transparent border-none">
            <FiEdit size={17} id={id} onClick={handleEdit}/>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Card