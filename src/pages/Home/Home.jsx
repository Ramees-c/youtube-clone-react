import React from 'react'
import "./Home.css"
import Sidebar from '../../components/Sidebar/Sidebar'

function Home({sidebar}) {
  return (
    <>
    <Sidebar sidebar={sidebar} />
    </>
  )
}

export default Home