import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './Table.css'
import InputElement from './InputElement'
import TableBody from './TableBody'

function Table() {
	const [data, setData] =useState()
	const [pages, setPages] = useState()
	const [lastIndex, setLastIndex] = useState()
	const [firstIndex, setFirstIndex] = useState(0)
	const [loading,setLoading] = useState(false)

	const dataFetcher = async () => {
		const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=200&page=1&sparkline=false')
		setData(response.data)
		setPages(response.data.slice(0,5))
		setLastIndex(5)
		setLoading(true)
	}

	useEffect(() => {
		dataFetcher()
	}, [])

	const nextHandler	=  () => {
		setPages(data.slice(lastIndex,lastIndex + 5))
		setLastIndex(lastIndex + 5)
		setFirstIndex(firstIndex + 5)
	}
	const previousHandler	=  () => {
		if (lastIndex>0 && firstIndex>0) {
			setFirstIndex(firstIndex - 5)
			setLastIndex(lastIndex - 5)
			setPages(data.slice(firstIndex-5 ,lastIndex-5))
		}
	}
	const searchHandler = (e) => {
		const searchValue = e.target.value
		const filteredData = data.filter(coin => coin.name.toLowerCase().includes(searchValue.toLowerCase()))
		setPages(filteredData.slice(0,5))
	}


	return (
		<div className='table_container'>
					<div className='table_header'>
						<InputElement searchHandler={searchHandler} />
					</div>
					{!loading ? (<div style={{textAlign:"center"}}>Loading....</div>) : (
						<TableBody pages={pages} />
				)}
					<div className='pagination_bottom'>
					<span className='pagination_index'>{firstIndex+1} - {lastIndex} of {data && data.length}</span>
					<span className='pagination_previous' onClick={previousHandler} >{'<'}</span>
					<span className='pagination_next' onClick={nextHandler} >{'>'}</span>
					</div>
		</div>
	)
}

export default Table