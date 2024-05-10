import React from 'react'
import TimeLineList from '../common/TimelineList'

type Props = {}

function ProductTimeline({}: Props) {
  return (
    <div className="min-h-screen flex justify-center items-center">
        <TimeLineList />
    </div>
  )
}

export default ProductTimeline