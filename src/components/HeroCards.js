import React from 'react'
import './HeroCards.css'
import google from '../Assets/GOOGL.png'
import amazon from '../Assets/AMZN.svg'
import fb from '../Assets/FB.png'
import { Draggable } from 'react-drag-reorder'

function HeroCards () {
  const heroes = [
    {
      name: 'GOOGL',
      image: google,
      asset: '1515 USD'
    },
    {
      name: 'FB',
      image: fb,
      asset: '266 USD'
    },
    {
      name: 'AMZN',
      image: amazon,
      asset: '3116 USD'
    }
  ]

  return (
    <div className='hero'>
      <div  className='hero_cards'>
        <Draggable>
          {heroes.map((item) => (
             <div className='hero_card_class' key={item.name}>
               <div className='hero_card_name'>
                 {item.name}
                 <img className='hero_card_image' src={item.image} alt={`${item.name} logo`} />
               </div>
               <div className='hero_card_asset'>
                 {item.asset}
               </div>
             </div>	))}
        </Draggable>
      </div>
    </div>
  )
}

export default HeroCards
