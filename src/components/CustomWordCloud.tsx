'use client'
import { useTheme } from 'next-themes'
import React from 'react'
import D3WordCloud from 'react-d3-cloud'

type Props = {}

const data = [
  { text: 'JavaScript', value: 10 },
  { text: 'React', value: 8 },
  { text: 'Node.js', value: 6 },
  { text: 'CSS', value: 5 },
  { text: 'HTML', value: 4 },
  { text: 'Python', value: 3 },
  { text: 'Django', value: 2 },
  { text: 'Flask', value: 1 },
  { text: 'Next.js', value: 1 },
  { text: 'TypeScript', value: 1 }
]

const fontSizeMapper = (word: {value: number }) => {
  return Math.log2(word.value) * 5 + 16
}

const CustomWordCloud = (props: Props) => {
  const theme = useTheme()
  return (
    <>
    <D3WordCloud height={550} font='Times'
    fontSize={fontSizeMapper}
    rotate={0}
    padding={10}
    fill = {theme.theme === 'dark' ? 'white':'black'}
    data={data}
    />

    </>
  )
}

export default CustomWordCloud