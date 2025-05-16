import React from 'react'

const Dropdown = ({title, options, func}) => {
  return (
    <div className=''>
      
      <select defaultValue="0" onChange={func} className='bg-zinc-600  hover:bg-zinc-300 text-zinc-900' name='format' id="format">
        
        <option value="0" disabled className='hidden'>{title}</option>
        {options.map((o, i)=>
        <option key={i} className='hover:bg-[#6556CD]' value={o}>
        
        {o.toUpperCase()}
        </option>

        
        )}
        
      </select>

         
    </div>
  )
}

export default Dropdown
