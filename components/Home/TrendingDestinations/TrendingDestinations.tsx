import React from 'react'
import DestinationList from './DestinationList'
import { getTrendingDestinations } from '@/sanity/getTrendingDes'

// After (Correct)









async function TrendingDestinations() {

    const destinations = await getTrendingDestinations()

  return (
    <div>
        <DestinationList destinations={destinations} />
    </div>
  )
}

export default TrendingDestinations