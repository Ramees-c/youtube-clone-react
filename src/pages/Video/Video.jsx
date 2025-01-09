import React from 'react'
import "./Video.css"
import PlayVideo from '../../components/PlayVideo/PlayVideo'
import Recommented from '../../components/Recommented/Recommented'
import { useParams } from 'react-router-dom'

function Video() {
  const {videoId, categoryId} = useParams();
  return (
    <div className='play-container'>
        <PlayVideo videoId={videoId} categoryId={categoryId} />
        <Recommented categoryId={categoryId} />
    </div>
  )
}

export default Video