import { getAuthsession } from "@/lib/nextauth";
import { quizCreationSchema } from "@/schemas/quiz";
import { NextResponse } from "next/server";
import { ZodError } from "zod";
import axios from "axios";
import {prisma} from "@/lib/db";

// /api/game
export async function POST(req:Request, res: Response) {
  try {
    const session = await getAuthsession();
    if (!session?.user) {
      return NextResponse.json(({ error: "Unauthorized" }), {
        status: 401,
      });
    }
    const body = await req.json();
    const { amount, topic, type } = quizCreationSchema.parse(body);
    const game = await prisma.game.create({
      data: {
        gameType: type,
        timeStarted: new Date(),
        userId: session.user.id,
        topic: topic,

      }
    })
    const {data} = await axios.post('${process.env.API_URL}/api/questions', {
      amount,
      topic,
      type,
    }
    )
    if (type === "mcq") {
      type mcqQuestion = {
        question: string;
        options: string[];
        answer: string;
      };
      let manyData = data.questions.map((question:mcqQuestion) => {
        let options = question.options;
        return {
          question: question.question,
          options: JSON.stringify(question.options),
          answer: question.answer,
          gameId: game.id,
          questionType: "mcq",
        };
      })
      await prisma.question.createMany({
        data: manyData
      })
    } else if (type === "open_ended") {
      type openQuestion = {
        question: string;
        answer: string;
      }
      let manyData = data.questions.map((question:openQuestion) => {
        return {
          question: question.question,
          answer: question.answer,
          gameId: game.id,
          questionType: "open_ended",
        } 
      })
      await prisma.question.createMany({
        data:manyData
      })
    }
    return NextResponse.json(
      {
        gameId: game.id,
        message: "Game created successfully",
      },
    )
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(({ error: error.issues }), {
        status: 400,
      });
    }
    return NextResponse.json(
      { error: "An error occurred while creating the game." },
      { status: 500 }
    )
  }
}