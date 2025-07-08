import { getAuthsession } from "@/lib/nextauth";
import { quizCreationSchema } from "@/schemas/quiz";
import { get } from "http";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

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
    const {} = quizCreationSchema.parse(body);
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(({ error: error.issues }), {
        status: 400,
      });
    }
  }
}