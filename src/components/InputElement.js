import React from 'react'
import * as FaIcons from "react-icons/fa";

function InputElement (props) {
  const {searchHandler} = props
  return (
    <div>
      <div className='table_header'>
        <h4>Crypto Details Table</h4>
				<div className='table_header_input'>
					<div>
					<FaIcons.FaSearch/>
					</div>
        <input
          type='text'
          id='bitcoin'
          placeholder='Search by Crypto Name'
          name='bitcoin'
          onChange={searchHandler} />
				</div>
		
      </div>
    </div>
  )
}

export default InputElement
