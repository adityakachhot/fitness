import { prisma } from '@/lib/prisma';
import { hash } from 'bcryptjs';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { name, email, password } = await req.json();
  if (!email || !password) {
    return NextResponse.json({ error: 'Email and password are required.' }, { status: 400 });
  }
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return NextResponse.json({ error: 'User already exists.' }, { status: 400 });
  }
  const hashedPassword = await hash(password, 10);
  const user = await prisma.user.create({
    data: { name, email, password: hashedPassword },
  });
  return NextResponse.json({ id: user.id, email: user.email, name: user.name });
} 