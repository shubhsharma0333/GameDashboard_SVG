import React from 'react'

const InputFeild= ({LabelName, type, name, placeholder, value, handleChange, inputStyles}) => {
    return (
      <div className='w-full'>
        <div className='flex items-center g-2 mb-2'>
          <label
            htmlFor={name}
            className="block text-sm font-medium text-white mx-2"
          >
            {LabelName}
          </label>
        </div>
        <input
          className={`${inputStyles} bg-grey-50 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#4649ff] focus:border-[#4649ff] outline-none block w-full p-3`}
          type={type}
          id={name}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          required
        />
        
      </div>
    )
  }

export default InputFeild