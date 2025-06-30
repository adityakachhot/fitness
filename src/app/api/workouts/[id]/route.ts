import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const workout = await prisma.workout.findUnique({ where: { id: params.id } });
  if (!workout) {
    return NextResponse.json({ error: 'Workout not found' }, { status: 404 });
  }
  return NextResponse.json(workout);
} 