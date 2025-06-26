import QuizCreation from '@/components/QuizCreation'
import { getAuthsession } from '@/lib/nextauth'
import { redirect } from 'next/navigation'
import React from 'react'

type Props = {}

export const metadata = {
  title: 'Quiz | AI Quiz',
}

const QuizPage = async (props: Props) => {
  const session = await getAuthsession()
  if (!session?.user) {
    return redirect('/')
  }
  return (
    <QuizCreation />
  )
}

export default QuizPage