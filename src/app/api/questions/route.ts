import { NextResponse } from "next/server"
import { quizCreationSchema } from "@/schemas/quiz"
import { ZodError } from "zod"
import { strict_output } from "@/lib/gpt"


// POST /api/questions
export const POST = async (req: Request, res: Response) => {
  try {
    const body = await req.json()
    const {amount, topic, type } = quizCreationSchema.parse(body)
    let questions:any
    if (type === "mcq") {
      questions = await strict_output(
        'You are a helpful AI that is able to generate questions and answers, the length of the answer should not exceed 15 words. Store all the pairs of questions and answers in a JSON array, each question should have 4 options, one of which is the correct answer. The output should be in the following format: [{"question": "Question text", "options": ["Option 1", "Option 2", "Option 3", "Option 4"], "answer": "Correct Option"}].',
        `Generate ${amount} multiple choice questions on the topic of ${topic}.`,
        {
          question: 'question',
          options: 'options',
          answer: 'answer',
        }
      )
    }
    return NextResponse.json(
      {
        questions
      },
      {
        status: 200
      }
    )
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 })
    }
  }
}