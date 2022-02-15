import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import * as BsIcons from "react-icons/bs";

function TableBody (props) {
  const { pages } = props
  const navigate = useNavigate()
	const[savedData,setSavedData]=useState()
	const[isSaved,setIsSaved]=useState()
	const[savedId,setSavedId]=useState()

  
	const routeHandler = (item) => {
		navigate('/view')
	}
	const dataFetcher = async () => {
		const response = await axios.get('https://crypto-bd0e2-default-rtdb.firebaseio.com/cryptoapp.json')
		const data = response && response.data
		if (data) {
			setSavedData(Object.values(data))
		}
		const savedIds = data && Object.values(data).map(item => item.id)
		setSavedId(savedIds)
	}

	useEffect(() => {
		dataFetcher()
	}, [isSaved])


	const dataPoster = async (item) => {
		const {name,symbol,market_cap,current_price,id} = item
		const res = await axios.post('https://crypto-bd0e2-default-rtdb.firebaseio.com/cryptoapp.json', {	
			  name,
				symbol,
				market_cap,
				current_price,
				id
		})
		setIsSaved(res)
	}
	const handleClick = (item) => {
			if (!savedId || !savedId.includes(item.id)) {
		dataPoster(item)
		}
  }

  return (
    <div>
      <table className='table_class'>
        <thead className='table_class_thead'>
          <tr>
            <th className='table-primary fs-6 text-center'>
              CRYPTO NAME
            </th>
            <th className='table-primary fs-6 text-center'>
              SYMBOL
            </th>
            <th className='table-primary fs-6 text-center'>
              MARKET CAP
            </th>
            <th className='table-primary fs-6 text-center'></th>
            <th className='table-primary fs-6 text-center'>
              CURRENT PRICE
            </th>
          </tr>
        </thead>
        <tbody>
          {pages && pages.map((item) => (
             <tr key={item.id}>
               <td className='text-center fs-6 fw-bold'>
                 {item.name}
               </td>
               <td className='text-center fs-6'>
                 <li className='symbol_class'>
								 	<BsIcons.BsDot size={20}/>
                   {(item.symbol).toUpperCase()}
                 </li>
               </td>
               <td className='text-center fs-6'>
                 {item.market_cap}
               </td>
               <td className='text-center fs-6'>
								 {
									 savedId && savedId.includes(item.id) ?
								(<div onClick={()=>routeHandler(item)} className="back_button_div">
									 VIEW
                 </div>)
								  :
								 (
									 <div onClick={()=>handleClick(item)} className='btn btn-primary'>
									 Save Data
                 </div>
								 )
								 }
               </td>
               <td className='text-center fs-6'>
                 $
                 {item.current_price} <br/><span style={{color:'grey', fontSize:12}}>USD</span>
               </td>
             </tr>)
           )}
        </tbody>
      </table>
    </div>
  )
}

export default TableBody
