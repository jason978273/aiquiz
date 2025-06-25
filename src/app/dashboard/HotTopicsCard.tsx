import CustomWordCloud from '@/components/CustomWordCloud'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'

type Props = {}

const HotTopicsCard = (props: Props) => {
  return (
    <Card className = 'col-span-4'>
      <CardHeader>
        <CardTitle className='text-2xl font-bold'>
          Hot Topics
        </CardTitle>
        <CardDescription>
          Stay updated with the latest trending topics in AI and technology. 
          Click on any topic to explore more.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <CustomWordCloud />
      </CardContent>
    </Card>
  )
}

export default HotTopicsCard