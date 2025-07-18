import MCQ from '@/components/MCQ';
import { prisma } from '@/lib/db';
import { getAuthsession } from '@/lib/nextauth';
import { redirect } from 'next/navigation';
import React from 'react'

type Props = {
  params: {
    gameId: string;

  }
}

const McqPage = async ({params}:Props) => {
  const { gameId } = await params;
  const session = await getAuthsession()
  if (!session?.user) {
    return redirect('/')
  }

  const game = await prisma.game.findUnique({
    where: {
      id: gameId
    },
    include: {
      questions: {
        select: {
          id:true,
          question:true,
          options:true
        }
      }
    }
  })
  if (!game || game.gameType !== 'mcq') {
    return redirect('/quiz')
  }
  return (
    <MCQ game={game} />
  )
}

export default McqPage