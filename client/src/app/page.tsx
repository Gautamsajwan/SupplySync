import Navbar from '@/components/common/ui/Navbar'
import HomePage from '@/pages/HomePage'
import React from 'react'

type Props = {}

function page({}: Props) {
  
  return (
    <>
      <Navbar />
      <HomePage />
    </>
  )
}

export default page
