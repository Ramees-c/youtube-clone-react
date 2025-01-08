import React from 'react'
import "./Video.css"
import PlayVideo from '../../components/PlayVideo/PlayVideo'
import Recommented from '../../components/Recommented/Recommented'

function Video() {
  return (
    <div className='play-container'>
        <PlayVideo />
        <Recommented />
    </div>
  )
}

export default Video