import React from 'react'
import BannerSlider from '../components/shared/BannerSlider.jsx'
import Recommended from '../components/Recommended.jsx'
import LiveEvents from '../components/LiveEvents.jsx'

const Home = () => {
  return (
    <div>
        <BannerSlider/>
        <Recommended/>
        <LiveEvents/>
    </div>
  )
}

export default Home