import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  const workouts = await prisma.workout.findMany();
  return NextResponse.json(workouts);
}

export async function POST(req: Request) {
  const { title, type, difficulty, description, steps, equipment, image, createdBy } = await req.json();
  const workout = await prisma.workout.create({
    data: { title, type, difficulty, description, steps, equipment, image, createdBy },
  });
  return NextResponse.json(workout);
} 